import React from "react";
import { Node, Edge, Action } from "../lib/reducer";

interface Props {
  nodes: Node[];
  edges: Edge[];
  dispatch: React.Dispatch<Action>;
}

const EdgesTable: React.FC<Props> = ({ nodes, edges, dispatch }: Props) => {
  const nodeOptions = nodes.map(node => (
    <option key={node.id} value={node.id}>
      {node.label}
    </option>
  ));

  const handleDeleteButtonClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const element = event.currentTarget as SVGSVGElement;
    dispatch({
      type: "DELETE_EDGE",
      payload: {
        id: element.dataset["id"],
      },
    });
  };

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.currentTarget as HTMLSelectElement;
    dispatch({
      type: "CHANGE_EDGE_FROM",
      payload: {
        id: element.dataset["id"],
        from: element.value,
      },
    });
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.currentTarget as HTMLSelectElement;
    dispatch({
      type: "CHANGE_EDGE_TO",
      payload: {
        id: element.dataset["id"],
        to: element.value,
      },
    });
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    dispatch({
      type: "CHANGE_EDGE_DATA",
      payload: {
        id: element.dataset["id"],
        data: element.value,
      },
    });
  };

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
          onClick={() => dispatch({ type: "ADD_EDGE" })}
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
              <th className="border"></th>
            </tr>
          </thead>
          <tbody>
            {edges.map(edge => (
              <tr key={edge.id}>
                <td className="border px-2">
                  <select
                    value={edge.from}
                    data-id={edge.id}
                    onChange={handleFromChange}
                  >
                    {nodeOptions}
                  </select>
                </td>
                <td className="border px-2">
                  <select
                    value={edge.to}
                    data-id={edge.id}
                    onChange={handleToChange}
                  >
                    {nodeOptions}
                  </select>
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    value={edge.data}
                    data-id={edge.id}
                    onChange={handleDataChange}
                  />
                </td>
                <td className="border px-2">
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-id={edge.id}
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

export default EdgesTable;
