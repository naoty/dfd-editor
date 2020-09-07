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
  text: string;
};

export const initialState: State = {
  nodes: {},
  edges: {},
  text: "graph TD\n",
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
      const nodes = {
        ...state.nodes,
        [newId]: {
          id: newId,
          type: NodeType.Process,
          name: "",
          location: "",
          label: generateLabel(NodeType.Process, "", ""),
        },
      };
      const text = generateText(nodes, state.edges);
      return { ...state, nodes, text };
    }
    case "DELETE_NODE": {
      const nodes = Object.keys(state.nodes)
        .filter(id => id !== action.payload.id)
        .reduce((nodes, id) => {
          nodes[id] = state.nodes[id];
          return nodes;
        }, {});
      const text = generateText(nodes, state.edges);
      return { ...state, nodes, text };
    }
    case "CHANGE_NODE_TYPE": {
      const nodes = {
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
      };
      const text = generateText(nodes, state.edges);
      return { ...state, nodes, text };
    }
    case "CHANGE_NODE_NAME": {
      const nodes = {
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
      };
      const text = generateText(nodes, state.edges);
      return { ...state, nodes, text };
    }
    case "CHANGE_NODE_LOCATION": {
      const nodes = {
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
      };
      const text = generateText(nodes, state.edges);
      return { ...state, nodes, text };
    }
    case "ADD_EDGE": {
      const newId = uuidv4();
      const edges = {
        ...state.edges,
        [newId]: {
          id: newId,
          from: Object.keys(state.nodes)[0],
          to: Object.keys(state.nodes)[0],
          data: "",
        },
      };
      const text = generateText(state.nodes, edges);
      return { ...state, edges, text };
    }
    case "DELETE_EDGE": {
      const edges = Object.keys(state.edges)
        .filter(id => id !== action.payload.id)
        .reduce((edges, id) => {
          edges[id] = state.edges[id];
          return edges;
        }, {});
      const text = generateText(state.nodes, edges);
      return { ...state, edges, text };
    }
    case "CHANGE_EDGE_FROM": {
      const edges = {
        ...state.edges,
        [action.payload.id]: {
          ...state.edges[action.payload.id],
          from: action.payload.from,
        },
      };
      const text = generateText(state.nodes, edges);
      return { ...state, edges, text };
    }
    case "CHANGE_EDGE_TO": {
      const edges = {
        ...state.edges,
        [action.payload.id]: {
          ...state.edges[action.payload.id],
          to: action.payload.to,
        },
      };
      const text = generateText(state.nodes, edges);
      return { ...state, edges, text };
    }
    case "CHANGE_EDGE_DATA": {
      const edges = {
        ...state.edges,
        [action.payload.id]: {
          ...state.edges[action.payload.id],
          data: action.payload.data,
        },
      };
      const text = generateText(state.nodes, edges);
      return { ...state, edges, text };
    }
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

const generateText = (
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
): string => {
  const indent = "  ";

  const nodeTexts = Object.values(nodes).map(node => {
    let brackets: string[];
    switch (node.type) {
      case NodeType.ExternalEntity:
        brackets = ["[", "]"];
        break;
      case NodeType.Process:
        brackets = ["(", ")"];
        break;
      case NodeType.Datastore:
        brackets = ["[(", ")]"];
        break;
    }

    let text = `${indent}${node.label}`;

    if (node.name !== "") {
      text += `${brackets[0]}"${node.name}`;
    }

    if (node.location !== "") {
      text += `<br>(${node.location})`;
    }

    if (node.name !== "") {
      text += `"${brackets[1]}`;
    }

    return text;
  });

  const edgeTexts = Object.values(edges).map(edge => {
    const fromLabel = nodes[edge.from]?.label;
    const toLabel = nodes[edge.to]?.label;

    if (edge.data === "") {
      return `${indent}${fromLabel} --> ${toLabel}`;
    } else {
      return `${indent}${fromLabel} -- ${edge.data} --> ${toLabel}`;
    }
  });

  return ["graph TD", ...nodeTexts, "", ...edgeTexts].join("\n");
};
