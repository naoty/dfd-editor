import { v4 as uuidv4 } from "uuid";

export type Node = {
  id: string;
  label: string;
  type: NodeType;
  name: string;
  location: string;
};

export enum NodeType {
  ExternalEntity = "ExternalEntity",
  Process = "Process",
  Datastore = "Datastore",
}

export type Edge = {
  id: string;
  from: string;
  to: string;
  data: string;
};

type State = {
  nodes: {
    [key: string]: Node;
  };
  edges: {
    [key: string]: Edge;
  };
};

export const initialState: State = {
  nodes: {},
  edges: {},
};

type AddNodeAction = {
  type: "ADD_NODE";
};

type DeleteNodeAction = {
  type: "DELETE_NODE";
  payload: {
    id: string;
  };
};

type ChangeNodeTypeAction = {
  type: "CHANGE_NODE_TYPE";
  payload: {
    id: string;
    type: NodeType;
  };
};

type ChangeNodeNameAction = {
  type: "CHANGE_NODE_NAME";
  payload: {
    id: string;
    name: string;
  };
};

type ChangeNodeLocationAction = {
  type: "CHANGE_NODE_LOCATION";
  payload: {
    id: string;
    location: string;
  };
};

type AddEdgeAction = {
  type: "ADD_EDGE";
};

type DeleteEdgeAction = {
  type: "DELETE_EDGE";
  payload: {
    id: string;
  };
};

type ChangeEdgeFromAction = {
  type: "CHANGE_EDGE_FROM";
  payload: {
    id: string;
    from: string;
  };
};

type ChangeEdgeToAction = {
  type: "CHANGE_EDGE_TO";
  payload: {
    id: string;
    to: string;
  };
};

type ChangeEdgeDataAction = {
  type: "CHANGE_EDGE_DATA";
  payload: {
    id: string;
    data: string;
  };
};

export type Action =
  | AddNodeAction
  | DeleteNodeAction
  | ChangeNodeTypeAction
  | ChangeNodeNameAction
  | ChangeNodeLocationAction
  | AddEdgeAction
  | DeleteEdgeAction
  | ChangeEdgeFromAction
  | ChangeEdgeToAction
  | ChangeEdgeDataAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NODE": {
      const newId = uuidv4();
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [newId]: {
            id: newId,
            type: NodeType.Process,
            name: "",
            location: "",
            label: generateLabel(NodeType.Process, "", ""),
          },
        },
      };
    }
    case "DELETE_NODE":
      return {
        ...state,
        nodes: Object.keys(state.nodes)
          .filter(id => id !== action.payload.id)
          .reduce((nodes, id) => {
            nodes[id] = state.nodes[id];
            return nodes;
          }, {}),
      };
    case "CHANGE_NODE_TYPE":
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: {
            ...state.nodes[action.payload.id],
            type: NodeType[action.payload.type],
            label: generateLabel(
              NodeType[action.payload.type],
              state.nodes[action.payload.id].name,
              state.nodes[action.payload.id].location
            ),
          },
        },
      };
    case "CHANGE_NODE_NAME":
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: {
            ...state.nodes[action.payload.id],
            name: action.payload.name,
            label: generateLabel(
              state.nodes[action.payload.id].type,
              action.payload.name,
              state.nodes[action.payload.id].location
            ),
          },
        },
      };
    case "CHANGE_NODE_LOCATION":
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: {
            ...state.nodes[action.payload.id],
            location: action.payload.location,
            label: generateLabel(
              state.nodes[action.payload.id].type,
              state.nodes[action.payload.id].name,
              action.payload.location
            ),
          },
        },
      };
    case "ADD_EDGE": {
      const newId = uuidv4();
      return {
        ...state,
        edges: {
          ...state.edges,
          [newId]: {
            id: newId,
            from: Object.keys(state.nodes)[0],
            to: Object.keys(state.nodes)[0],
            data: "",
          },
        },
      };
    }
    case "DELETE_EDGE":
      return {
        ...state,
        edges: Object.keys(state.edges)
          .filter(id => id !== action.payload.id)
          .reduce((edges, id) => {
            edges[id] = state.edges[id];
            return edges;
          }, {}),
      };
    case "CHANGE_EDGE_FROM":
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.payload.id]: {
            ...state.edges[action.payload.id],
            from: action.payload.from,
          },
        },
      };
    case "CHANGE_EDGE_TO":
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.payload.id]: {
            ...state.edges[action.payload.id],
            to: action.payload.to,
          },
        },
      };
    case "CHANGE_EDGE_DATA":
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.payload.id]: {
            ...state.edges[action.payload.id],
            data: action.payload.data,
          },
        },
      };
  }
};

const generateLabel = (
  type: NodeType,
  name: string,
  location: string
): string => {
  const parts: string[] = [];
  switch (type) {
    case NodeType.ExternalEntity:
      parts.push("e");
      break;
    case NodeType.Process:
      parts.push("p");
      break;
    case NodeType.Datastore:
      parts.push("d");
      break;
  }

  if (name !== "") {
    const normalizedName = name
      .toLowerCase()
      .replace(/[/]/, "")
      .replace(/\s/, "_");
    parts.push(normalizedName);
  }

  if (location !== "") {
    const normalizedLocation = location
      .toLowerCase()
      .replace(/[/]/, "")
      .replace(/\s/, "_");
    parts.push(normalizedLocation);
  }

  return parts.join("_");
};
