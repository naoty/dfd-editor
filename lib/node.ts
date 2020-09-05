import { v4 as uuidv4 } from "uuid";

export class Node {
  id: string;
  type: string;
  name: string;
  location: string;

  constructor(type: NodeType, name: string, location: string) {
    this.id = uuidv4();
    this.type = type;
    this.name = name;
    this.location = location;
  }

  label(): string {
    const parts: string[] = [];
    switch (this.type) {
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

    if (this.name !== "") {
      const name = this.name
        .toLowerCase()
        .replace(/[/]/, "")
        .replace(/\s/, "_");
      parts.push(name);
    }

    if (this.location !== "") {
      const location = this.location
        .toLowerCase()
        .replace(/[/]/, "")
        .replace(/\s/, "_");
      parts.push(location);
    }

    return parts.join("_");
  }
}

export enum NodeType {
  ExternalEntity = "ExternalEntity",
  Process = "Process",
  Datastore = "Datastore",
}
