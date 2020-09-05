import React from "react";
import { Node, NodeType, Action } from "../lib/reducer";

interface Props {
  nodes: Node[];
  dispatch: React.Dispatch<Action>;
}

const NodesTable: React.FC<Props> = ({ nodes, dispatch }: Props) => {
  const handleDeleteButtonClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const element = event.currentTarget as SVGSVGElement;
    dispatch({
      type: "DELETE_NODE",
      payload: {
        id: element.dataset["id"],
      },
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.currentTarget as HTMLSelectElement;
    dispatch({
      type: "CHANGE_NODE_TYPE",
      payload: {
        id: element.dataset["id"],
        type: NodeType[element.value],
      },
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    dispatch({
      type: "CHANGE_NODE_NAME",
      payload: {
        id: element.dataset["id"],
        name: element.value,
      },
    });
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    dispatch({
      type: "CHANGE_NODE_LOCATION",
      payload: {
        id: element.dataset["id"],
        location: element.value,
      },
    });
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
          onClick={() => dispatch({ type: "ADD_NODE" })}
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
              <th className="border">Label</th>
              <th className="border">Type</th>
              <th className="border">Name</th>
              <th className="border">Location</th>
              <th className="border"></th>
            </tr>
          </thead>
          <tbody>
            {nodes.map(node => (
              <tr key={node.id}>
                <td className="border px-2">{node.label}</td>
                <td className="border px-2">
                  <select
                    value={node.type}
                    data-id={node.id}
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
                    value={node.name}
                    data-id={node.id}
                    onChange={handleNameChange}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    value={node.location}
                    data-id={node.id}
                    onChange={handleLocationChange}
                  />
                </td>
                <td className="border px-2">
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-id={node.id}
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
