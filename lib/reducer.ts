import { Node, NodeType } from "./node";
import { Edge } from "./edge";

type State = {
  nodes: Node[];
  edges: Edge[];
};

export const initialState: State = {
  nodes: [
    new Node(NodeType.ExternalEntity, "User", ""),
    new Node(NodeType.Process, "API", "/sign_up"),
    new Node(NodeType.Datastore, "MySQL", "users"),
  ],
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
  | ChangeEdgeFromAction
  | ChangeEdgeToAction
  | ChangeEdgeDataAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NODE":
      return {
        nodes: [...state.nodes, new Node(NodeType.Process, "", "")],
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
          new Edge(state.nodes[0].id, state.nodes[0].id, ""),
        ],
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
