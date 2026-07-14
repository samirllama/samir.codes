// lib/data/system-map.ts
// The one architecture underneath every shipped system, top-down: natural
// language at the top, determinism at the bottom. Replaces the old skills tag
// cloud - every technology carries the system(s) it earned its place in, so
// the stack reads as evidence, not a keyword list.

export interface SystemTech {
  name: string;
  /** The system(s) this earned its place in. */
  provenance: string;
}

export interface SystemLayer {
  id: string;
  label: string;
  role: string;
  tech: SystemTech[];
}

export const systemLayers: SystemLayer[] = [
  {
    id: "interface",
    label: "Interface",
    role: "Where people hand work to the agent and approve what comes back.",
    tech: [
      { name: "Next.js / React", provenance: "Atlas console · Tradeops-AI" },
      { name: "TypeScript", provenance: "Atlas · bp" },
      { name: "HITL approval console", provenance: "Atlas" },
    ],
  },
  {
    id: "agents",
    label: "Agent layer",
    role: "The LLM reasons and drafts - the only place natural language is allowed to decide anything.",
    tech: [
      { name: "Claude on Bedrock", provenance: "Atlas" },
      { name: "LangGraph", provenance: "TradeOps-AI" },
      { name: "LangChain", provenance: "Atlas" },
      { name: "Python orchestrator", provenance: "Travel A2A" },
    ],
  },
  {
    id: "retrieval",
    label: "Retrieval",
    role: "Grounds the model in real documents before it is allowed to answer.",
    tech: [
      { name: "Pinecone", provenance: "Atlas · TradeOps-AI" },
      { name: "Bedrock Knowledge Base", provenance: "Atlas" },
    ],
  },
  {
    id: "core",
    label: "Deterministic core",
    role: "Everything that has to be right - pricing, compliance, math - lives in tested code with no model in the loop.",
    tech: [
      { name: "Go pricing engine", provenance: "Travel A2A" },
      { name: "Pre-model guard", provenance: "TradeOps-AI" },
      { name: "Tested quote logic", provenance: "Atlas" },
    ],
  },
  {
    id: "data",
    label: "Data",
    role: "State, transactions, and the analytics that ops teams actually read.",
    tech: [
      { name: "DynamoDB", provenance: "Atlas" },
      { name: "GraphQL / Apollo", provenance: "bp" },
      { name: "D3 dashboards", provenance: "bp" },
    ],
  },
  {
    id: "runtime",
    label: "Runtime",
    role: "Serverless by default - it scales to zero, bills nothing between requests, and leaves an audit trail.",
    tech: [
      { name: "AWS Lambda", provenance: "Atlas" },
      { name: "Cloud Run", provenance: "Travel A2A" },
      { name: "CloudWatch / OTel", provenance: "Atlas" },
    ],
  },
];
