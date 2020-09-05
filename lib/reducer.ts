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
  nodes: Node[];
  edges: Edge[];
};

export const initialState: State = {
  nodes: [],
  edges: [],
};

type AddNodeAction = {
  type: "ADD_NODE";
};

type DeleteNodeAction = {
  type: "DELETE_NODE";
  payload: {
    index: number;
  };
};

type ChangeNodeTypeAction = {
  type: "CHANGE_NODE_TYPE";
  payload: {
    index: number;
    type: NodeType;
  };
};

type ChangeNodeNameAction = {
  type: "CHANGE_NODE_NAME";
  payload: {
    index: number;
    name: string;
  };
};

type ChangeNodeLocationAction = {
  type: "CHANGE_NODE_LOCATION";
  payload: {
    index: number;
    location: string;
  };
};

type AddEdgeAction = {
  type: "ADD_EDGE";
};

type DeleteEdgeAction = {
  type: "DELETE_EDGE";
  payload: {
    index: number;
  };
};

type ChangeEdgeFromAction = {
  type: "CHANGE_EDGE_FROM";
  payload: {
    index: number;
    from: string;
  };
};

type ChangeEdgeToAction = {
  type: "CHANGE_EDGE_TO";
  payload: {
    index: number;
    to: string;
  };
};

type ChangeEdgeDataAction = {
  type: "CHANGE_EDGE_DATA";
  payload: {
    index: number;
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
    case "ADD_NODE":
      return {
        nodes: [
          ...state.nodes,
          {
            id: uuidv4(),
            type: NodeType.Process,
            name: "",
            location: "",
            label: generateLabel(NodeType.Process, "", ""),
          },
        ],
        edges: state.edges,
      };
    case "DELETE_NODE":
      return {
        nodes: state.nodes.filter((_, index) => index !== action.payload.index),
        edges: state.edges,
      };
    case "CHANGE_NODE_TYPE":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.type = action.payload.type;
            node.label = generateLabel(node.type, node.name, node.location);
          }
          return node;
        }),
        edges: state.edges,
      };
    case "CHANGE_NODE_NAME":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.name = action.payload.name;
            node.label = generateLabel(node.type, node.name, node.location);
          }
          return node;
        }),
        edges: state.edges,
      };
    case "CHANGE_NODE_LOCATION":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.location = action.payload.location;
            node.label = generateLabel(node.type, node.name, node.location);
          }
          return node;
        }),
        edges: state.edges,
      };
    case "ADD_EDGE":
      return {
        nodes: state.nodes,
        edges: [
          ...state.edges,
          {
            id: uuidv4(),
            from: state.nodes[0].id,
            to: state.nodes[0].id,
            data: "",
          },
        ],
      };
    case "DELETE_EDGE":
      return {
        nodes: state.nodes,
        edges: state.edges.filter((_, index) => index !== action.payload.index),
      };
    case "CHANGE_EDGE_FROM":
      return {
        nodes: state.nodes,
        edges: state.edges.map((edge, index) => {
          if (index === action.payload.index) {
            edge.from = action.payload.from;
          }
          return edge;
        }),
      };
    case "CHANGE_EDGE_TO":
      return {
        nodes: state.nodes,
        edges: state.edges.map((edge, index) => {
          if (index === action.payload.index) {
            edge.to = action.payload.to;
          }
          return edge;
        }),
      };
    case "CHANGE_EDGE_DATA":
      return {
        nodes: state.nodes,
        edges: state.edges.map((edge, index) => {
          if (index === action.payload.index) {
            edge.data = action.payload.data;
          }
          return edge;
        }),
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
