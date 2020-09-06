import React from "react";
import { Node, Edge, NodeType } from "../lib/reducer";

interface Props {
  nodes: { [key: string]: Node };
  edges: { [key: string]: Edge };
}

const Editor: React.FC<Props> = ({ nodes, edges }: Props) => {
  const indent = "  ";

  const nodeTexts = Object.values(nodes).map(node => {
    let brackets: string[];
    switch (node.type) {
      case NodeType.ExternalEntity:
        brackets = ["[", "]"];
        break;
      case NodeType.Process:
        brackets = ["(", ")"];
        break;
      case NodeType.Datastore:
        brackets = ["[(", ")]"];
        break;
    }

    let text = `${indent}${node.label}`;

    if (node.name !== "") {
      text += `${brackets[0]}"${node.name}`;
    }

    if (node.location !== "") {
      text += `<br>(${node.location})`;
    }

    if (node.name !== "") {
      text += `"${brackets[1]}`;
    }

    return text;
  });

  const edgeTexts = Object.values(edges).map(edge => {
    const fromLabel = nodes[edge.from]?.label;
    const toLabel = nodes[edge.to]?.label;

    if (edge.data === "") {
      return `${indent}${fromLabel} --> ${toLabel}`;
    } else {
      return `${indent}${fromLabel} -- ${edge.data} --> ${toLabel}`;
    }
  });

  const text = ["graph TD", ...nodeTexts, "", ...edgeTexts].join("\n");

  return (
    <textarea
      className="w-full h-full font-mono"
      value={text}
      readOnly={true}
    />
  );
};

export default Editor;
