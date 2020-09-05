import React, { useState } from "react";
import classnames from "classnames";

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

  const [editableCellId, setEditableCellId] = useState<string | null>(null);

  const handleButtonClick = () => {
    setNodes([
      ...nodes,
      { id: "new nodes", type: null, name: "", location: null },
    ]);
  };

  const handleCellClick = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;
    setEditableCellId(element.id);
  };

  const handleCellBlur = () => {
    setEditableCellId(null);
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
          onClick={handleButtonClick}
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
            {nodes.map((node, index) => (
              <tr key={node.id}>
                <td className="border px-2">
                  <span
                    id={`id_${index}`}
                    className={classnames({
                      hidden: editableCellId === `id_${index}`,
                    })}
                    onClick={handleCellClick}
                  >
                    {node.id}
                  </span>
                  <input
                    type="text"
                    value={node.id}
                    className={classnames({
                      hidden: editableCellId !== `id_${index}`,
                    })}
                    onBlur={handleCellBlur}
                  />
                </td>
                <td className="border px-2">
                  <span
                    id={`type_${index}`}
                    className={classnames({
                      hidden: editableCellId === `type_${index}`,
                    })}
                    onClick={handleCellClick}
                  >
                    {node.type}
                  </span>
                  <select
                    name={`${index}`}
                    value={node.type}
                    className={classnames({
                      hidden: editableCellId !== `type_${index}`,
                    })}
                    onBlur={handleCellBlur}
                    onChange={handleTypeChange}
                  >
                    <option value="ExternalEntity">ExternalEntity</option>
                    <option value="Process">Process</option>
                    <option value="Datastore">Datastore</option>
                  </select>
                </td>
                <td className="border px-2">
                  <span
                    id={`name_${index}`}
                    className={classnames({
                      hidden: editableCellId === `name_${index}`,
                    })}
                    onClick={handleCellClick}
                  >
                    {node.name}
                  </span>
                  <input
                    type="text"
                    name={`${index}`}
                    value={node.name}
                    className={classnames({
                      hidden: editableCellId !== `name_${index}`,
                    })}
                    onChange={handleNameChange}
                    onBlur={handleCellBlur}
                  />
                </td>
                <td className="border px-2">
                  <span
                    id={`location_${index}`}
                    className={classnames({
                      hidden: editableCellId === `location_${index}`,
                    })}
                    onClick={handleCellClick}
                  >
                    {node.location}
                  </span>
                  <input
                    type="text"
                    name={`${index}`}
                    value={node.location}
                    className={classnames({
                      hidden: editableCellId !== `location_${index}`,
                    })}
                    onChange={handleLocationChange}
                    onBlur={handleCellBlur}
                  />
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
