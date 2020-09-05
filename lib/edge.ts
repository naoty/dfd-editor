export class Edge {
  from: string;
  to: string;
  data: string;

  constructor(from: string, to: string, data: string) {
    this.from = from;
    this.to = to;
    this.data = data;
  }
}
