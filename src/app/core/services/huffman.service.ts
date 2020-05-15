import {Injectable} from '@angular/core';
import {Tree} from './tree';

@Injectable({
  providedIn: 'root'
})
export class HuffmanService {

  /**
   * Creates a frequency map of each letter in the given text.
   * @param {string} text text that should have frequency map calculated for
   * @returns frequency table
   */
  createFrequencyTable(text: string): Map<string, number> {
    const frequencyTable: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < text.length; i++) {
      const charFrequency = frequencyTable.get(text.charAt(i));
      if (charFrequency != undefined) {
        frequencyTable.set(text.charAt(i), charFrequency + 1);
      } else {
        frequencyTable.set(text.charAt(i), 1)
      }
    }

    return frequencyTable;
  }

  /**
   * Creates Huffman tree using basic Huffman coding.
   * @param {Map} frequencyTable map that contains frequency of occurs of letters
   * @returns Huffman tree
   */
  createHuffmanTree(frequencyTable: Map<string, number>): Tree | null {
    const frequencyTableCopy: Map<string, number> = new Map<string, number>(frequencyTable);

    let huffmanTree: Tree | null = null;
    if (frequencyTableCopy.size == 0) {
      return huffmanTree;
    }

    if (frequencyTableCopy.size == 1) {
      // Tree contains only one node so it have to be added on the one side of tree
      huffmanTree = {
        value: 1,
        right: {value: 1, text: frequencyTableCopy.keys().next().value, code: '1'}
      };
      return huffmanTree;
    }

    huffmanTree = this.createHuffmanTreeWithMultipleNodes(frequencyTableCopy);
    if (huffmanTree) {
      this.addCodesToHuffmanTree(huffmanTree);
    }

    return huffmanTree;
  }

  /**
   * Creates every node of Huffman tree that contains more than one node using basic Huffman coding.
   * @param {Map} frequencyTable map that contains frequency of occurs of letters
   * @returns Huffman tree
   */
  private createHuffmanTreeWithMultipleNodes(frequencyTable: Map<string, number>): Tree {
    const huffmanTreeByText: Map<string, Tree> = new Map<string, Tree>();

    // Each letter should have corresponding node in Huffman tree
    while (frequencyTable.size > 1) {
      let minValueOnLeft: number | null = null;
      let letterWithMinValueOnLeft: string | null = null;
      let minValueOnRight: number | null = null;
      let letterWithMinValueOnRight: string | null = null;

      // Gets two letters with the lowest values in frequency table to put into right and left node
      for (const [letter, value] of frequencyTable) {

        // This is first iteration so left node should be set
        if (letterWithMinValueOnLeft == null) {
          letterWithMinValueOnLeft = letter;
          minValueOnLeft = value;

          // This is second iteration so right node should be set
        } else if (letterWithMinValueOnRight == null) {
          letterWithMinValueOnRight = letter;
          minValueOnRight = value;

          // For other iterations if current letter have larger value then it should be replaced
        } else if (minValueOnLeft != null && minValueOnLeft >= value) {
          minValueOnRight = minValueOnLeft;
          letterWithMinValueOnRight = letterWithMinValueOnLeft;
          minValueOnLeft = value;
          letterWithMinValueOnLeft = letter;
        }
      }

      // Two letters with lowest value should have node created and be merged in the frequency table
      if (letterWithMinValueOnLeft != null && letterWithMinValueOnRight != null
        && minValueOnLeft != null && minValueOnRight != null) {

        frequencyTable.delete(letterWithMinValueOnLeft);
        frequencyTable.delete(letterWithMinValueOnRight);
        frequencyTable.set(letterWithMinValueOnLeft + letterWithMinValueOnRight,
          minValueOnLeft + minValueOnRight);

        const currentHuffmanTree: Tree = {
          value: minValueOnLeft + minValueOnRight,
          text: letterWithMinValueOnLeft + letterWithMinValueOnRight
        };

        // The letter can consist of several letters with a related subtree, then adds subtree into current tree
        if (huffmanTreeByText.has(letterWithMinValueOnLeft)) {
          currentHuffmanTree.left = huffmanTreeByText.get(letterWithMinValueOnLeft);
          huffmanTreeByText.delete(letterWithMinValueOnLeft);
        } else {
          currentHuffmanTree.left = {value: minValueOnLeft, text: letterWithMinValueOnLeft};
        }

        if (huffmanTreeByText.has(letterWithMinValueOnRight)) {
          currentHuffmanTree.right = huffmanTreeByText.get(letterWithMinValueOnRight);
          huffmanTreeByText.delete(letterWithMinValueOnRight);
        } else {
          currentHuffmanTree.right = {value: minValueOnRight, text: letterWithMinValueOnRight};
        }

        huffmanTreeByText.set(letterWithMinValueOnLeft + letterWithMinValueOnRight, currentHuffmanTree);
      }
    }

    return huffmanTreeByText.values().next().value;
  }

  /**
   * Adds code to each node of Huffman tree.
   * @param huffmanTree Huffman tree that should have codes added
   * @returns Huffman tree with codes added
   */
  private addCodesToHuffmanTree(huffmanTree: Tree): Tree {
    return this.recursivelyAddCodesToHuffmanTree(huffmanTree);
  }

  /**
   * Adds code to nodes of Huffman tree depending on the side of node and its parent's code.
   * This method is run recursively for left and right side of tree.
   * @param huffmanTree Huffman tree that should have codes added
   * @param side the side of the tree where the node is located. Binary tree contains left and right leaves.
   * @param code code of node's parent
   * @returns Huffman tree with codes added
   */
  private recursivelyAddCodesToHuffmanTree(huffmanTree: Tree, side?: string, code?: string): Tree {
    if (side) {
      if (side == 'left') {
        huffmanTree.code = code + '0';
      } else {
        huffmanTree.code = code + '1';
      }
    } else {
      huffmanTree.code = '';
    }

    if (huffmanTree.left) {
      this.recursivelyAddCodesToHuffmanTree(huffmanTree.left, 'left', huffmanTree.code);
    }

    if (huffmanTree.right) {
      this.recursivelyAddCodesToHuffmanTree(huffmanTree.right, 'right', huffmanTree.code);
    }

    return huffmanTree;
  }

}
