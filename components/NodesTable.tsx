import React, { useState } from "react";
import { Node, NodeType } from "../lib/node";

const NodesTable: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    new Node(NodeType.ExternalEntity, "User", ""),
    new Node(NodeType.Process, "API", "/sign_up"),
    new Node(NodeType.Datastore, "MySQL", "users"),
  ]);

  const handleAddButtonClick = () => {
    setNodes([...nodes, new Node(NodeType.Process, "new node", "")]);
  };

  const handleDeleteButtonClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const element = event.currentTarget as SVGSVGElement;
    const deletedIndex = parseInt(element.dataset["index"]);
    const newNodes = nodes.filter((_, index) => index !== deletedIndex);
    setNodes(newNodes);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    const index = parseInt(element.name);
    const newNodes = nodes.map((node, nodeIndex) => {
      if (nodeIndex === index) {
        node.type = NodeType[element.value];
      }
      return node;
    });
    setNodes(newNodes);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const index = parseInt(element.name);
    const newNodes = nodes.map((node, nodeIndex) => {
      if (nodeIndex === index) {
        node.name = element.value;
      }
      return node;
    });
    setNodes(newNodes);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const index = parseInt(element.name);
    const newNodes = nodes.map((node, nodeIndex) => {
      if (nodeIndex === index) {
        node.location = element.value;
      }
      return node;
    });
    setNodes(newNodes);
  };

  return (
    <>
      <div className="flex flex-row">
        <h1 className="flex-grow px-2 font-bold">Nodes</h1>
        <svg
          className="w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleAddButtonClick}
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
              <th className="border">ID</th>
              <th className="border">Type</th>
              <th className="border">Name</th>
              <th className="border">Location</th>
              <th className="border"></th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td className="border px-2">{node.id()}</td>
                <td className="border px-2">
                  <select
                    name={`${index}`}
                    value={node.type}
                    onChange={handleTypeChange}
                  >
                    <option value="ExternalEntity">ExternalEntity</option>
                    <option value="Process">Process</option>
                    <option value="Datastore">Datastore</option>
                  </select>
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    name={`${index}`}
                    value={node.name}
                    onChange={handleNameChange}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    name={`${index}`}
                    value={node.location}
                    onChange={handleLocationChange}
                  />
                </td>
                <td className="border px-2">
                  <svg
                    data-index={index}
                    className="w-4 h-4 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleDeleteButtonClick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NodesTable;
