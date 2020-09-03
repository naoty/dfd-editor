import React, { useState } from "react";

type Node = {
  id: string;
  type: NodeType | null;
  name: string;
  location: string | null;
};

enum NodeType {
  ExternalEntity = "ExternalEntity",
  Process = "Process",
  Datastore = "Datastore",
}

const NodesTable: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "e_user",
      type: NodeType.ExternalEntity,
      name: "User",
      location: null,
    },
    {
      id: "p_api_sign_up",
      type: NodeType.Process,
      name: "API",
      location: "/sign_up",
    },
    {
      id: "d_mysql_users",
      type: NodeType.Datastore,
      name: "MySQL",
      location: "users",
    },
  ]);

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setNodes([
      ...nodes,
      { id: "new nodes", type: null, name: "", location: null },
    ]);
    event.preventDefault();
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
              <th className="border">ID</th>
              <th className="border">Type</th>
              <th className="border">Name</th>
              <th className="border">Location</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map(node => (
              <tr key={node.id}>
                <td className="border px-2">{node.id}</td>
                <td className="border px-2">{node.type}</td>
                <td className="border px-2">{node.name}</td>
                <td className="border px-2">{node.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NodesTable;
