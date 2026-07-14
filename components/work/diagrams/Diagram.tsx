// components/work/diagrams/Diagram.tsx
// MDX-facing registry: case studies embed diagrams by name so content files
// stay free of component imports.
import type { ComponentType } from "react";
import { TradeAgentFlow } from "./TradeAgentFlow";
import { TravelPretripFlow } from "./TravelPretripFlow";
import styles from "./diagrams.module.css";

const DIAGRAMS: Record<string, ComponentType> = {
  "tradeops-ai-flow": TradeAgentFlow,
  "travel-pretrip-flow": TravelPretripFlow,
};

interface DiagramProps {
  name: string;
  caption?: string;
}

export const Diagram = ({ name, caption }: DiagramProps) => {
  const DiagramSvg = DIAGRAMS[name];
  if (!DiagramSvg) {
    console.error(`Unknown case-study diagram: "${name}"`);
    return null;
  }
  return (
    <figure className={styles.figure}>
      <DiagramSvg />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
};
