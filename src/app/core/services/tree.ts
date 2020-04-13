export interface Tree {
  value: number;
  text?: string;
  code?: string;
  left?: Tree;
  right?: Tree;
  parentNode?: Tree;
}
