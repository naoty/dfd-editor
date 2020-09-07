import React, { useState, useEffect } from "react";
import mermaid from "mermaid";

interface Props {
  text: string;
}

const Diagram: React.FC<Props> = ({ text }: Props) => {
  const [svg, setSvg] = useState<string>(null);

  // ref: https://github.com/mermaid-js/mermaid/issues/478
  const id = `diagram-${Math.floor(Math.random() * 10000)}`;

  useEffect(() => {
    const container = document.getElementById("diagram-container");
    try {
      mermaid.mermaidAPI?.render(id, text, svg => setSvg(svg), container);
    } catch (error) {
      console.error(error);
    }
  }, [text]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: svg }}></div>
    </>
  );
};

export default Diagram;
