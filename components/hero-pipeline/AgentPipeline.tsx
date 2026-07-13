"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
} from "@/lib/gsap";
import { MOTION_DUR, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";
import {
  desktopPipeline,
  mobilePipeline,
  TERMINAL_LINES,
  TERMINAL_ESCALATION,
  type PipelineLayout,
  type PipelineNode,
} from "@/lib/data/pipeline";
import styles from "./AgentPipeline.module.css";

const NODE_RADIUS: Record<PipelineNode["kind"], number> = {
  input: 10,
  guard: 10,
  agent: 12,
  tool: 8,
  output: 10,
  human: 12,
};

const nodeClass = (kind: PipelineNode["kind"]): string => {
  switch (kind) {
    case "guard":
      return styles.nodeGuard;
    case "agent":
      return styles.nodeAgent;
    case "tool":
      return styles.nodeTool;
    case "human":
      return styles.nodeHuman;
    default:
      return styles.nodeDefault;
  }
};

/**
 * Pure render of one layout. Deterministic markup (no randomness, no dates),
 * so the server pass and hydration match exactly, and the DEFAULT state is
 * the fully drawn graph - animation only ever animates FROM hidden states,
 * which keeps no-JS and reduced-motion visitors on a complete diagram.
 */
const PipelineSvg = ({
  layout,
  prefix,
  className,
}: {
  layout: PipelineLayout;
  prefix: string;
  className: string;
}) => (
  <svg
    id={`${prefix}-pipeline`}
    className={`${styles.svg} ${className}`}
    viewBox={layout.viewBox}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    {layout.edges.map((edge) => (
      <path
        key={edge.id}
        id={`${prefix}-${edge.id}`}
        data-edge={edge.kind}
        className={
          edge.kind === "escalation" ? styles.edgeEscalation : styles.edge
        }
        d={edge.d}
      />
    ))}

    {layout.nodes.map((node) => (
      <g
        key={node.id}
        id={`${prefix}-node-${node.id}`}
        data-node={node.kind}
      >
        <rect
          className={nodeClass(node.kind)}
          x={node.x}
          y={node.y}
          width={node.w}
          height={node.h}
          rx={NODE_RADIUS[node.kind]}
        />
        <text
          className={styles.nodeLabel}
          x={node.x + node.w / 2}
          y={node.sublabel ? node.y + node.h / 2 - 4 : node.y + node.h / 2}
          textAnchor="middle"
          dominantBaseline={node.sublabel ? "auto" : "central"}
        >
          {node.label}
        </text>
        {node.sublabel ? (
          <text
            className={styles.nodeSublabel}
            x={node.x + node.w / 2}
            y={node.y + node.h / 2 + 14}
            textAnchor="middle"
          >
            {node.sublabel}
          </text>
        ) : null}
      </g>
    ))}

    {layout.chips.map((chip) => (
      <g
        key={chip.id}
        id={`${prefix}-${chip.id}`}
        data-chip
        className={styles.chip}
      >
        <rect
          className={
            chip.tone === "success" ? styles.chipSuccess : styles.chipDanger
          }
          x={chip.x}
          y={chip.y}
          width={chip.w}
          height={chip.h}
          rx={14}
        />
        <text
          className={
            chip.tone === "success"
              ? styles.chipTextSuccess
              : styles.chipTextDanger
          }
          x={chip.x + chip.w / 2}
          y={chip.y + chip.h / 2}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {chip.label}
        </text>
      </g>
    ))}

    {layout.terminal ? (
      <g id={`${prefix}-terminal`}>
        <rect
          className={styles.terminal}
          x={layout.terminal.x}
          y={layout.terminal.y}
          width={layout.terminal.w}
          height={layout.terminal.h}
          rx={8}
        />
        <text
          className={styles.terminalText}
          x={layout.terminal.x + 12}
          y={layout.terminal.y + layout.terminal.h / 2}
          dominantBaseline="central"
        >
          <tspan className={styles.terminalPrompt}>&gt;&nbsp;</tspan>
          <tspan id={`${prefix}-terminal-line`}>agent standing by</tspan>
        </text>
      </g>
    ) : null}

    {/* Reusable pulses; hidden by default (decorative, transient state). */}
    <circle id={`${prefix}-pulse`} className={styles.pulse} r={4.5} cx={-20} cy={-20} />
    <circle id={`${prefix}-pulse-esc`} className={styles.pulseEscalation} r={4.5} cx={-20} cy={-20} />
  </svg>
);

const TOOL_ORDER = [
  "tool-classify",
  "tool-lookup",
  "tool-retrieve",
  "tool-draft",
] as const;

export const AgentPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
          mobile:
            "(prefers-reduced-motion: no-preference) and (max-width: 767.98px)",
          // Reduced motion: no context added on purpose - the SSR default is
          // the complete static diagram.
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean;
            mobile: boolean;
          };
          const prefix = conditions.desktop ? "d" : "m";
          const svg = containerRef.current?.querySelector<SVGSVGElement>(
            `#${prefix}-pipeline`,
          );
          if (!svg) return;

          const q = gsap.utils.selector(svg);
          const sel = (id: string): string => `#${prefix}-${id}`;
          const hasTerminal = prefix === "d";

          // --- Intro: nodes rise in, edges draw themselves. ---
          const intro = gsap.timeline();
          intro.from(q("[data-node]"), {
            opacity: 0,
            scale: 0.94,
            transformOrigin: "50% 50%",
            duration: MOTION_DUR.base,
            ease: MOTION_EASE.out,
            stagger: MOTION_STAGGER.tight,
          });
          intro.from(
            q("[data-edge]"),
            {
              drawSVG: "0%",
              duration: MOTION_DUR.slow,
              ease: "power2.inOut",
              stagger: MOTION_STAGGER.tight,
            },
            0.25,
          );

          // --- One traversal of the pipeline. ---
          const travel = (
            target: string,
            path: string,
            duration: number,
            reverse = false,
          ): gsap.TweenVars => ({
            motionPath: {
              path: sel(path),
              align: sel(path),
              alignOrigin: [0.5, 0.5],
              start: reverse ? 1 : 0,
              end: reverse ? 0 : 1,
            },
            duration,
            ease: "power1.inOut",
          });

          const pop = (): gsap.TweenVars => ({
            scale: 1.05,
            transformOrigin: "50% 50%",
            duration: 0.16,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });

          const scramble = (text: string): gsap.TweenVars => ({
            scrambleText: { text, chars: "▮▯01", speed: 0.4 },
            duration: 0.5,
            ease: "none",
          });

          const showPulse = (tl: gsap.core.Timeline, pulse: string): void => {
            tl.set(sel(pulse), { opacity: 1 });
          };
          const hidePulse = (tl: gsap.core.Timeline): void => {
            tl.set([sel("pulse"), sel("pulse-esc")], { opacity: 0 });
          };

          const normalRun = (): gsap.core.Timeline => {
            const tl = gsap.timeline();
            showPulse(tl, "pulse");
            tl.to(sel("pulse"), travel("pulse", "edge-inquiry-guard", 0.5));
            tl.to(sel("node-guard"), pop());
            tl.to(sel("pulse"), travel("pulse", "edge-guard-agent", 0.5));
            tl.to(sel("node-agent"), pop());

            TOOL_ORDER.forEach((tool, index) => {
              const edge = `edge-agent-${tool}`;
              if (hasTerminal) {
                tl.to(sel("terminal-line"), scramble(TERMINAL_LINES[index]), "<");
              }
              tl.to(sel("pulse"), travel("pulse", edge, 0.45));
              tl.to(sel(`node-${tool}`), pop());
              tl.to(sel("pulse"), travel("pulse", edge, 0.45, true));
            });

            tl.to(sel("pulse"), travel("pulse", "edge-agent-draft", 0.5));
            tl.to(sel("node-draft"), pop());
            tl.to(sel("pulse"), travel("pulse", "edge-draft-human", 0.5));
            tl.to(sel("node-human"), pop());
            if (prefix === "d") {
              tl.fromTo(
                sel("chip-approved"),
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.3, ease: MOTION_EASE.out },
              );
              tl.to(sel("chip-approved"), {
                opacity: 0,
                duration: 0.4,
                delay: 1,
              });
            }
            hidePulse(tl);
            return tl;
          };

          const escalationRun = (): gsap.core.Timeline => {
            const tl = gsap.timeline();
            showPulse(tl, "pulse");
            tl.to(sel("pulse"), travel("pulse", "edge-inquiry-guard", 0.5));
            if (hasTerminal) {
              tl.to(sel("terminal-line"), scramble(TERMINAL_ESCALATION[0]));
            }
            // The guard trips: shake, hand off to the red pulse, skip the model.
            tl.to(sel("node-guard"), {
              keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 0 }],
              duration: 0.3,
            });
            tl.set(sel("pulse"), { opacity: 0 });
            tl.set(sel("pulse-esc"), { opacity: 1 });
            tl.to(sel("pulse-esc"), travel("pulse-esc", "edge-escalation", 1));
            tl.to(sel("node-human"), pop());
            if (hasTerminal) {
              tl.to(sel("terminal-line"), scramble(TERMINAL_ESCALATION[1]), "<");
            }
            if (prefix === "d") {
              tl.fromTo(
                sel("chip-escalated"),
                { opacity: 0, y: -6 },
                { opacity: 1, y: 0, duration: 0.3, ease: MOTION_EASE.out },
              );
              tl.to(sel("chip-escalated"), {
                opacity: 0,
                duration: 0.4,
                delay: 1,
              });
            }
            hidePulse(tl);
            return tl;
          };

          // Two clean runs, then the guard catches one - forever.
          const master = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.2,
            paused: true,
            delay: 0.4,
          });
          master.add(normalRun());
          master.add(normalRun(), "+=1.1");
          master.add(escalationRun(), "+=1.1");

          intro.eventCallback("onComplete", () => master.play());

          // Don't burn CPU when the hero is offscreen.
          const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive) {
                master.resume();
              } else {
                master.pause();
              }
            },
          });

          // --- Pin + scrub expand (desktop only) ---
          // As the pipeline scrolls to center it pins for one beat and scales
          // out to the Layout's content-column edge, then releases. The scroll
          // stays 1:1 outside the pinned beat; the scale target is measured at
          // refresh so it tracks the responsive column width.
          let expandST: ScrollTrigger | undefined;
          const visual = containerRef.current?.closest<HTMLElement>(
            "[data-hero-visual]",
          );
          if (conditions.desktop && visual) {
            // Grow the 860px pipeline to the full content-column width. The SVG
            // is centered (margin auto) inside the full-width visual, so scaling
            // from its own centre keeps it centered and inside the hero box -
            // no clipped end nodes. Measured from the container (never scaled)
            // so the ratio is stable on refresh.
            const targetScale = (): number => {
              const container = containerRef.current;
              if (!container) return 1;
              const cw = container.getBoundingClientRect().width;
              const restW = parseFloat(getComputedStyle(svg).maxWidth) || cw;
              return Math.max(1, cw / Math.min(restW, cw));
            };

            const expand = gsap.fromTo(
              svg,
              { scale: 1 },
              { scale: targetScale, ease: "none", transformOrigin: "50% 50%" },
            );

            expandST = ScrollTrigger.create({
              trigger: visual,
              start: "center center",
              end: () => "+=" + Math.round(window.innerHeight * 0.9),
              pin: visual,
              pinSpacing: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              animation: expand,
            });
          }

          return () => {
            trigger.kill();
            expandST?.kill();
            master.kill();
            intro.kill();
            if (visual) gsap.set(visual, { clearProps: "all" });
            gsap.set(svg, { clearProps: "transform" });
          };
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <PipelineSvg
        layout={desktopPipeline}
        prefix="d"
        className={styles.desktopOnly}
      />
      <PipelineSvg
        layout={mobilePipeline}
        prefix="m"
        className={styles.mobileOnly}
      />
    </div>
  );
};
