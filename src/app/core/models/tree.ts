/**
 * Interface representing Huffman tree.
 * @property {number} value value of this node
 * @property {string} text letter or several letters that this node represents
 * @property {string} code Huffman code of this node
 * @property {Tree} left left leaf
 * @property {Tree} right right leaf
 * @property {Tree} parentNode root node
 */
export interface Tree {
  value: number;
  text?: string;
  code?: string;
  left?: Tree;
  right?: Tree;
  parentNode?: Tree;
}
