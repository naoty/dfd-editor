import React from "react";
import { Node, NodeType } from "../lib/node";
import { Action } from "../lib/reducer";

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
        index: parseInt(element.dataset["index"]),
      },
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.currentTarget as HTMLSelectElement;
    dispatch({
      type: "CHANGE_NODE_TYPE",
      payload: {
        index: parseInt(element.dataset["index"]),
        type: NodeType[element.value],
      },
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    dispatch({
      type: "CHANGE_NODE_NAME",
      payload: {
        index: parseInt(element.dataset["index"]),
        name: element.value,
      },
    });
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    dispatch({
      type: "CHANGE_NODE_LOCATION",
      payload: {
        index: parseInt(element.dataset["index"]),
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
                    value={node.type}
                    data-index={index}
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
                    data-index={index}
                    onChange={handleNameChange}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    value={node.location}
                    data-index={index}
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
                    data-index={index}
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
