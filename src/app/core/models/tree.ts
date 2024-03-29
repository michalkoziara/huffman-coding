/**
 * Class representing Huffman tree.
 * @property {number} value value of this node
 * @property {string} text letter or several letters that this node represents
 * @property {string} code Huffman code of this node
 * @property {Tree} left left leaf
 * @property {Tree} right right leaf
 * @property {Tree} parentNode root node
 */
export class Tree {
  value: number;
  text?: string;
  code?: string;
  index?: number;
  left?: Tree;
  right?: Tree;
  parentNode?: Tree;

  constructor(value: number,
              text?: string,
              code?: string,
              index?: number,
              left?: Tree,
              right?: Tree,
              parentNode?: Tree) {
    this.value = value;
    this.text = text;
    this.code = code;
    this.index = index;
    this.left = left;
    this.right = right;
    this.parentNode = parentNode;
  }
}
