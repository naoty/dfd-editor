import React from "react";
import { Node } from "../lib/node";
import { Edge } from "../lib/edge";

interface Props {
  nodes: Node[];
  edges: Edge[];
}

const EdgesTable: React.FC<Props> = ({ nodes, edges }: Props) => {
  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
  };

  const nodeLabels = nodes.map(node => node.label());

  return (
    <>
      <div className="flex flex-row">
        <h1 className="flex-grow px-2 font-bold">Edges</h1>
        <svg
          className="w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border">From</th>
              <th className="border">To</th>
              <th className="border">Data</th>
            </tr>
          </thead>
          <tbody>
            {edges.map(edge => (
              <tr key={`${edge.from}-${edge.to}`}>
                <td className="border px-2">
                  <select value={edge.from}>
                    {nodeLabels.map((label, index) => (
                      <option key={index}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-2">
                  <select value={edge.to}>
                    {nodeLabels.map((label, index) => (
                      <option key={index}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-2">{edge.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EdgesTable;
