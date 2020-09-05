import { v4 as uuidv4 } from "uuid";

export class Edge {
  id: string;
  from: string;
  to: string;
  data: string;

  constructor(from: string, to: string, data: string) {
    this.id = uuidv4();
    this.from = from;
    this.to = to;
    this.data = data;
  }
}
