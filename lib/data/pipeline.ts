// lib/data/pipeline.ts
// Layout config for the hero AgentPipeline SVG. The graph mirrors the real
// trade-agent architecture: a vendor-scoped inquiry passes a deterministic
// guard BEFORE any model call, the agent loops over four tools, and the
// draft always stops at a human. Edges are computed from node geometry so
// the two layouts stay structurally identical.

export type PipelineNodeKind =
  | "input"
  | "guard"
  | "agent"
  | "tool"
  | "output"
  | "human";

export interface PipelineNode {
  id: string;
  kind: PipelineNodeKind;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type PipelineEdgeKind = "flow" | "tool" | "escalation";

export interface PipelineEdge {
  id: string;
  kind: PipelineEdgeKind;
  d: string;
}

export interface PipelineChip {
  id: string;
  label: string;
  tone: "success" | "danger";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PipelineTerminal {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PipelineLayout {
  id: "desktop" | "mobile";
  viewBox: string;
  width: number;
  height: number;
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  chips: PipelineChip[];
  terminal?: PipelineTerminal;
}

const cx = (n: PipelineNode): number => n.x + n.w / 2;
const cy = (n: PipelineNode): number => n.y + n.h / 2;

/** Straight edge between two nodes on the same horizontal row. */
const rowEdge = (a: PipelineNode, b: PipelineNode): string =>
  `M ${a.x + a.w} ${cy(a)} L ${b.x} ${cy(b)}`;

/** Straight edge between two nodes in the same vertical column. */
const columnEdge = (a: PipelineNode, b: PipelineNode): string =>
  `M ${cx(a)} ${a.y + a.h} L ${cx(b)} ${b.y}`;

/** Curved edge from a spread point on the agent's top edge up to a tool. */
const toolEdgeUp = (
  agent: PipelineNode,
  tool: PipelineNode,
  spread: number,
): string => {
  const sx = agent.x + agent.w * spread;
  const sy = agent.y;
  const ex = cx(tool);
  const ey = tool.y + tool.h;
  return `M ${sx} ${sy} C ${sx} ${sy - 44}, ${ex} ${ey + 44}, ${ex} ${ey}`;
};

/** Curved edge from a spread point on the agent's bottom edge down to a tool. */
const toolEdgeDown = (
  agent: PipelineNode,
  tool: PipelineNode,
  spread: number,
): string => {
  const sx = agent.x + agent.w * spread;
  const sy = agent.y + agent.h;
  const ex = cx(tool);
  const ey = tool.y;
  return `M ${sx} ${sy} C ${sx} ${sy + 34}, ${ex} ${ey - 34}, ${ex} ${ey}`;
};

// --- Desktop: left-to-right, tools fanned above the agent -------------------

const dInquiry: PipelineNode = { id: "inquiry", kind: "input", label: "Inquiry", sublabel: "scoped request", x: 24, y: 220, w: 112, h: 64 };
const dGuard: PipelineNode = { id: "guard", kind: "guard", label: "Guard", sublabel: "pre-model rules", x: 180, y: 220, w: 116, h: 64 };
const dAgent: PipelineNode = { id: "agent", kind: "agent", label: "Agent", sublabel: "reasoning loop", x: 340, y: 210, w: 136, h: 84 };
const dDraft: PipelineNode = { id: "draft", kind: "output", label: "Draft", sublabel: "never auto-sent", x: 520, y: 220, w: 104, h: 64 };
const dHuman: PipelineNode = { id: "human", kind: "human", label: "Human", sublabel: "sign-off", x: 656, y: 210, w: 88, h: 84 };

const dTools: PipelineNode[] = [
  { id: "tool-classify", kind: "tool", label: "classify", x: 300, y: 40, w: 120, h: 32 },
  { id: "tool-lookup", kind: "tool", label: "lookup", x: 436, y: 40, w: 120, h: 32 },
  { id: "tool-retrieve", kind: "tool", label: "retrieve", x: 300, y: 92, w: 120, h: 32 },
  { id: "tool-draft", kind: "tool", label: "draft", x: 436, y: 92, w: 120, h: 32 },
];

export const desktopPipeline: PipelineLayout = {
  id: "desktop",
  viewBox: "0 0 760 440",
  width: 760,
  height: 440,
  nodes: [dInquiry, dGuard, dAgent, ...dTools, dDraft, dHuman],
  edges: [
    { id: "edge-inquiry-guard", kind: "flow", d: rowEdge(dInquiry, dGuard) },
    { id: "edge-guard-agent", kind: "flow", d: rowEdge(dGuard, dAgent) },
    { id: "edge-agent-tool-classify", kind: "tool", d: toolEdgeUp(dAgent, dTools[0], 0.2) },
    { id: "edge-agent-tool-lookup", kind: "tool", d: toolEdgeUp(dAgent, dTools[1], 0.8) },
    { id: "edge-agent-tool-retrieve", kind: "tool", d: toolEdgeUp(dAgent, dTools[2], 0.4) },
    { id: "edge-agent-tool-draft", kind: "tool", d: toolEdgeUp(dAgent, dTools[3], 0.6) },
    { id: "edge-agent-draft", kind: "flow", d: rowEdge(dAgent, dDraft) },
    { id: "edge-draft-human", kind: "flow", d: rowEdge(dDraft, dHuman) },
    {
      id: "edge-escalation",
      kind: "escalation",
      d: `M ${cx(dGuard)} ${dGuard.y + dGuard.h} C ${cx(dGuard)} 412, ${cx(dHuman)} 412, ${cx(dHuman)} ${dHuman.y + dHuman.h}`,
    },
  ],
  chips: [
    { id: "chip-approved", label: "approved", tone: "success", x: 644, y: 152, w: 104, h: 28 },
    { id: "chip-escalated", label: "escalated", tone: "danger", x: 644, y: 318, w: 104, h: 28 },
  ],
  terminal: { x: 340, y: 330, w: 236, h: 36 },
};

// --- Mobile: top-to-bottom, tools in a 2x2 grid below the agent -------------

const mInquiry: PipelineNode = { id: "inquiry", kind: "input", label: "Inquiry", sublabel: "scoped request", x: 110, y: 16, w: 140, h: 56 };
const mGuard: PipelineNode = { id: "guard", kind: "guard", label: "Guard", sublabel: "pre-model rules", x: 110, y: 112, w: 140, h: 56 };
const mAgent: PipelineNode = { id: "agent", kind: "agent", label: "Agent", sublabel: "reasoning loop", x: 100, y: 208, w: 160, h: 72 };
const mDraft: PipelineNode = { id: "draft", kind: "output", label: "Draft", sublabel: "never auto-sent", x: 110, y: 428, w: 140, h: 56 };
const mHuman: PipelineNode = { id: "human", kind: "human", label: "Human", sublabel: "sign-off", x: 110, y: 522, w: 140, h: 60 };

const mTools: PipelineNode[] = [
  { id: "tool-classify", kind: "tool", label: "classify", x: 28, y: 322, w: 140, h: 30 },
  { id: "tool-lookup", kind: "tool", label: "lookup", x: 192, y: 322, w: 140, h: 30 },
  { id: "tool-retrieve", kind: "tool", label: "retrieve", x: 28, y: 368, w: 140, h: 30 },
  { id: "tool-draft", kind: "tool", label: "draft", x: 192, y: 368, w: 140, h: 30 },
];

export const mobilePipeline: PipelineLayout = {
  id: "mobile",
  viewBox: "0 0 360 600",
  width: 360,
  height: 600,
  nodes: [mInquiry, mGuard, mAgent, ...mTools, mDraft, mHuman],
  edges: [
    { id: "edge-inquiry-guard", kind: "flow", d: columnEdge(mInquiry, mGuard) },
    { id: "edge-guard-agent", kind: "flow", d: columnEdge(mGuard, mAgent) },
    { id: "edge-agent-tool-classify", kind: "tool", d: toolEdgeDown(mAgent, mTools[0], 0.2) },
    { id: "edge-agent-tool-lookup", kind: "tool", d: toolEdgeDown(mAgent, mTools[1], 0.8) },
    { id: "edge-agent-tool-retrieve", kind: "tool", d: toolEdgeDown(mAgent, mTools[2], 0.35) },
    { id: "edge-agent-tool-draft", kind: "tool", d: toolEdgeDown(mAgent, mTools[3], 0.65) },
    {
      // Routed through the gap between the two tool columns.
      id: "edge-agent-draft",
      kind: "flow",
      d: `M ${cx(mAgent)} ${mAgent.y + mAgent.h} L ${cx(mDraft)} ${mDraft.y}`,
    },
    { id: "edge-draft-human", kind: "flow", d: columnEdge(mDraft, mHuman) },
    {
      id: "edge-escalation",
      kind: "escalation",
      d: `M ${mGuard.x + mGuard.w} ${cy(mGuard)} C 342 190, 342 490, ${mHuman.x + mHuman.w} ${cy(mHuman)}`,
    },
  ],
  chips: [],
};

/** Terminal lines streamed during the normal (agent) run - one per tool. */
export const TERMINAL_LINES: readonly string[] = [
  "classifying restriction codes",
  "looking up shipment manifest",
  "retrieving tariff clauses",
  "drafting clearance reply",
];

/** Terminal lines for the escalation run: the guard fires, the model never runs. */
export const TERMINAL_ESCALATION: readonly string[] = [
  "guard: severity flag matched",
  "escalated to human · 0 tokens",
];
