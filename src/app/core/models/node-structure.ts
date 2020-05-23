export class NodeStructure {
  innerHTML: string;
  children: NodeStructure[]|null;

  constructor(innerHTML: string, children: NodeStructure[]|null) {
    this.innerHTML = innerHTML;
    this.children = children;
  }
}
