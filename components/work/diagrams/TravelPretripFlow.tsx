// components/work/diagrams/TravelPretripFlow.tsx
// Static architecture diagram for the travel pre-trip approval case study:
// two services in two languages, joined by an A2A contract that carries
// derived numerics only. The pattern (deterministic core, LLM shell) is the
// subject; the diagram shows where that boundary physically sits.
import styles from "./diagrams.module.css";

export const TravelPretripFlow = () => (
  <svg
    className={`${styles.svg} ${styles.travel}`}
    viewBox="0 0 720 340"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="tp-flow-title"
  >
    <title id="tp-flow-title">
      Travel pre-trip approval architecture: a Python ADK orchestrator runs
      intake, fare prep, policy and finalize agents; a separate Go pricing
      engine computes fares as a pure function. The two services meet only at
      an A2A contract carrying derived numbers, and a missing quote escalates
      to human review.
    </title>
    <defs>
      <marker
        id="tp-arrow"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 8 4 L 0 8 z" className={styles.arrowFlow} />
      </marker>
      <marker
        id="tp-arrow-danger"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 8 4 L 0 8 z" className={styles.arrowDanger} />
      </marker>
    </defs>

    <rect className={styles.zone} x="20" y="48" width="420" height="180" rx="14" />
    <text className={styles.zoneLabel} x="36" y="72">
      Orchestrator · Python + ADK
    </text>
    <text className={styles.zoneSub} x="36" y="88">
      Cloud Run · private · workflow graph of specialist agents
    </text>

    <rect className={styles.zoneSolid} x="500" y="48" width="200" height="180" rx="14" />
    <text className={styles.zoneLabel} x="516" y="72">
      Pricing engine · Go
    </text>
    <text className={styles.zoneSub} x="516" y="88">
      Cloud Run · private
    </text>

    <path className={styles.seam} d="M 470 58 L 470 240" />
    <g>
      <rect className={styles.seamChip} x="438" y="30" width="64" height="24" rx="12" />
      <text className={styles.seamLabel} x="470" y="46" textAnchor="middle">
        A2A
      </text>
    </g>

    <path className={styles.edge} d="M 124 138 L 140 138" markerEnd="url(#tp-arrow)" />
    <path className={styles.edge} d="M 232 138 L 248 138" markerEnd="url(#tp-arrow)" />
    <path className={styles.edge} d="M 324 138 L 340 138" markerEnd="url(#tp-arrow)" />

    <path
      className={styles.edge}
      d="M 220 120 C 290 66, 420 60, 500 100"
      markerEnd="url(#tp-arrow)"
    />
    <text className={styles.edgeLabel} x="290" y="38" textAnchor="middle">
      FareQuoteRequest · derived numerics, no PII
    </text>

    <path
      className={styles.edge}
      d="M 500 148 C 430 206, 350 206, 296 158"
      markerEnd="url(#tp-arrow)"
    />
    <text className={styles.edgeLabel} x="398" y="224" textAnchor="middle">
      FareQuote · re-emitted byte-for-byte
    </text>

    <g>
      <rect className={styles.nodeChip} x="40" y="120" width="84" height="36" rx="8" />
      <text className={styles.labelChip} x="82" y="142" textAnchor="middle">
        intake
      </text>
    </g>
    <g>
      <rect className={styles.nodeChip} x="140" y="120" width="92" height="36" rx="8" />
      <text className={styles.labelChip} x="186" y="142" textAnchor="middle">
        fare prep
      </text>
    </g>
    <g>
      <rect className={styles.nodeAccent} x="248" y="120" width="76" height="36" rx="8" />
      <text className={styles.labelChip} x="286" y="142" textAnchor="middle">
        policy
      </text>
    </g>
    <g>
      <rect className={styles.nodeChip} x="340" y="120" width="84" height="36" rx="8" />
      <text className={styles.labelChip} x="382" y="142" textAnchor="middle">
        finalize
      </text>
    </g>

    <g>
      <rect className={styles.nodeGlow} x="520" y="112" width="160" height="36" rx="8" />
      <text className={styles.labelChip} x="600" y="134" textAnchor="middle">
        fare.Calculate()
      </text>
    </g>
    <text className={styles.note} x="600" y="176" textAnchor="middle">
      pure function · table-driven tests
    </text>
    <text className={styles.note} x="600" y="190" textAnchor="middle">
      no LLM anywhere in this box
    </text>

    <path
      className={styles.edgeEscalation}
      d="M 286 156 C 286 230, 138 230, 138 272"
      markerEnd="url(#tp-arrow-danger)"
    />
    <g>
      <rect className={styles.nodeDanger} x="40" y="272" width="196" height="30" rx="15" />
      <text className={styles.labelDanger} x="138" y="291" textAnchor="middle">
        no quote → human review
      </text>
    </g>

    <text className={styles.note} x="470" y="262" textAnchor="middle">
      agent card discovered at runtime
    </text>
    <text className={styles.note} x="470" y="278" textAnchor="middle">
      every number from tested code, never a model
    </text>
  </svg>
);
