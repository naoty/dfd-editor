import { Node, NodeType } from "./node";

type State = {
  nodes: Node[];
};

export const initialState: State = {
  nodes: [
    new Node(NodeType.ExternalEntity, "User", ""),
    new Node(NodeType.Process, "API", "/sign_up"),
    new Node(NodeType.Datastore, "MySQL", "users"),
  ],
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

export type Action =
  | AddNodeAction
  | DeleteNodeAction
  | ChangeNodeTypeAction
  | ChangeNodeNameAction
  | ChangeNodeLocationAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NODE":
      return { nodes: [...state.nodes, new Node(NodeType.Process, "", "")] };
    case "DELETE_NODE":
      return {
        nodes: state.nodes.filter((_, index) => index !== action.payload.index),
      };
    case "CHANGE_NODE_TYPE":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.type = action.payload.type;
          }
          return node;
        }),
      };
    case "CHANGE_NODE_NAME":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.name = action.payload.name;
          }
          return node;
        }),
      };
    case "CHANGE_NODE_LOCATION":
      return {
        nodes: state.nodes.map((node, index) => {
          if (index === action.payload.index) {
            node.location = action.payload.location;
          }
          return node;
        }),
      };
  }
};
