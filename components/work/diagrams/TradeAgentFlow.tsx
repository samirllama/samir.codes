// components/work/diagrams/TradeAgentFlow.tsx
// Static architecture diagram for the tradeops-ai case study. Deliberately a
// different altitude than the animated hero pipeline: this one shows the
// production request path, the escalation bypass, and the audit floor.
import styles from "./diagrams.module.css";

export const TradeAgentFlow = () => (
  <svg
    className={`${styles.svg} ${styles.tradeAgent}`}
    viewBox="0 0 720 360"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="ta-flow-title"
  >
    <title id="ta-flow-title">
      Request path of the trade compliance agent: an inquiry passes edge validation and a
      deterministic guard before the LangGraph agent loop; drafts stop at an analyst, escalations
      bypass the model entirely, and every step lands in the audit log.
    </title>
    <defs>
      <marker
        id="ta-arrow"
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
        id="ta-arrow-danger"
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

    <path className={styles.edge} d="M 108 178 L 122 178" markerEnd="url(#ta-arrow)" />
    <path className={styles.edge} d="M 238 178 L 252 178" markerEnd="url(#ta-arrow)" />
    <path className={styles.edge} d="M 352 178 L 366 178" markerEnd="url(#ta-arrow)" />
    <path className={styles.edge} d="M 502 178 L 516 178" markerEnd="url(#ta-arrow)" />
    <path className={styles.edge} d="M 596 178 L 610 178" markerEnd="url(#ta-arrow)" />

    <path
      className={styles.edge}
      d="M 388 132 C 388 108, 388 96, 388 76"
      markerEnd="url(#ta-arrow)"
    />
    <path
      className={styles.edge}
      d="M 484 132 C 484 108, 508 96, 520 76"
      markerEnd="url(#ta-arrow)"
    />
    <path
      className={styles.edge}
      d="M 404 132 C 404 116, 408 112, 411 102"
      markerEnd="url(#ta-arrow)"
    />
    <path
      className={styles.edge}
      d="M 468 132 C 468 116, 500 116, 528 110"
      markerEnd="url(#ta-arrow)"
    />

    <path
      className={styles.edgeEscalation}
      d="M 304 216 C 304 292, 657 292, 657 228"
      markerEnd="url(#ta-arrow-danger)"
    />
    <text className={styles.edgeLabelDanger} x="480" y="308" textAnchor="middle">
      escalation · guard match routes around the model · 0 tokens
    </text>

    <g>
      <rect className={styles.node} x="20" y="148" width="88" height="60" rx="10" />
      <text className={styles.label} x="64" y="174" textAnchor="middle">
        Inquiry
      </text>
      <text className={styles.sublabel} x="64" y="190" textAnchor="middle">
        vendor-scoped
      </text>
    </g>

    <g>
      <rect className={styles.node} x="122" y="140" width="116" height="76" rx="10" />
      <text className={styles.label} x="180" y="166" textAnchor="middle">
        API edge
      </text>
      <text className={styles.sublabel} x="180" y="182" textAnchor="middle">
        FastAPI · Cloud Run
      </text>
      <text className={styles.sublabel} x="180" y="196" textAnchor="middle">
        validate · rate-limit
      </text>
    </g>

    <g>
      <rect className={styles.nodeAccent} x="252" y="140" width="104" height="76" rx="10" />
      <text className={styles.label} x="304" y="170" textAnchor="middle">
        Guard
      </text>
      <text className={styles.sublabel} x="304" y="188" textAnchor="middle">
        deterministic rules
      </text>
    </g>

    <g>
      <rect className={styles.nodeGlow} x="366" y="132" width="136" height="92" rx="12" />
      <text className={styles.label} x="434" y="172" textAnchor="middle">
        Agent loop
      </text>
      <text className={styles.sublabel} x="434" y="190" textAnchor="middle">
        LangGraph · Gemini
      </text>
      <text className={styles.sublabel} x="434" y="204" textAnchor="middle">
        on Vertex AI
      </text>
    </g>

    <g>
      <rect className={styles.nodeChip} x="330" y="46" width="112" height="30" rx="8" />
      <text className={styles.labelChip} x="386" y="65" textAnchor="middle">
        classify
      </text>
    </g>
    <g>
      <rect className={styles.nodeChip} x="456" y="46" width="150" height="30" rx="8" />
      <text className={styles.labelChip} x="531" y="65" textAnchor="middle">
        manifest · Firestore
      </text>
    </g>
    <g>
      <rect className={styles.nodeChip} x="344" y="86" width="134" height="30" rx="8" />
      <text className={styles.labelChip} x="411" y="105" textAnchor="middle">
        tariff · Pinecone
      </text>
    </g>
    <g>
      <rect className={styles.nodeChip} x="492" y="86" width="104" height="30" rx="8" />
      <text className={styles.labelChip} x="544" y="105" textAnchor="middle">
        draft reply
      </text>
    </g>

    <g>
      <rect className={styles.node} x="516" y="148" width="80" height="60" rx="10" />
      <text className={styles.label} x="556" y="174" textAnchor="middle">
        Draft
      </text>
      <text className={styles.sublabel} x="556" y="190" textAnchor="middle">
        never auto-sent
      </text>
    </g>

    <g>
      <rect className={styles.nodeSuccess} x="610" y="140" width="90" height="88" rx="10" />
      <text className={styles.label} x="655" y="176" textAnchor="middle">
        Analyst
      </text>
      <text className={styles.sublabel} x="655" y="194" textAnchor="middle">
        approve / reject
      </text>
    </g>

    <path className={styles.dropline} d="M 180 216 L 180 316" />
    <path className={styles.dropline} d="M 434 224 L 434 316" />
    <path className={styles.dropline} d="M 556 208 L 556 316" />

    <g>
      <rect className={styles.audit} x="20" y="316" width="680" height="30" rx="8" />
      <text className={styles.auditText} x="360" y="335" textAnchor="middle">
        AgentTraces audit floor · inputs, outputs, tokens and latency for every step, surfaced on
        /traces
      </text>
    </g>
  </svg>
);
