import React from "react";

interface Props {
  text: string;
}

const Editor: React.FC<Props> = ({ text }: Props) => {
  return (
    <textarea
      className="w-full h-full font-mono"
      value={text}
      rows={text.split("\n").length}
      readOnly={true}
    />
  );
};

export default Editor;
