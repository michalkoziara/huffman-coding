import {Injectable} from '@angular/core';
import {Tree} from './tree';

@Injectable({
  providedIn: 'root'
})
export class HuffmanService {

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

  createHuffmanTree(frequencyTable: Map<string, number>): Tree | null {
    const frequencyTableCopy: Map<string, number> = new Map<string, number>(frequencyTable);

    let huffmanTree: Tree | null = null;
    if (frequencyTableCopy.size == 0) {
      return huffmanTree;
    }

    if (frequencyTableCopy.size == 1) {
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

  private createHuffmanTreeWithMultipleNodes(frequencyTable: Map<string, number>): Tree {
    const huffmanTreeByText: Map<string, Tree> = new Map<string, Tree>();
    while (frequencyTable.size > 1) {
      let minLeftValue: number | null = null;
      let minLeft: string | null = null;
      let minRightValue: number | null = null;
      let minRight: string | null = null;

      for (const [key, value] of frequencyTable) {
        if (minLeft == null) {
          minLeft = key;
          minLeftValue = value;
        } else if (minRight == null) {
          minRight = key;
          minRightValue = value;
        } else if (minLeftValue != null && minLeftValue >= value) {
          minRightValue = minLeftValue;
          minRight = minLeft;
          minLeftValue = value;
          minLeft = key;
        }
      }

      if (minLeft != null && minRight != null && minLeftValue != null && minRightValue != null) {
        frequencyTable.delete(minLeft);
        frequencyTable.delete(minRight);
        frequencyTable.set(minLeft + minRight, minLeftValue + minRightValue);

        const currentHuffmanTree: Tree = {
          value: minLeftValue + minRightValue,
          text: minLeft + minRight
        };

        if (huffmanTreeByText.has(minLeft)) {
          currentHuffmanTree.left = huffmanTreeByText.get(minLeft);
          huffmanTreeByText.delete(minLeft);
        } else {
          currentHuffmanTree.left = {value: minLeftValue, text: minLeft};
        }

        if (huffmanTreeByText.has(minRight)) {
          currentHuffmanTree.right = huffmanTreeByText.get(minRight);
          huffmanTreeByText.delete(minRight);
        } else {
          currentHuffmanTree.right = {value: minRightValue, text: minRight};
        }

        huffmanTreeByText.set(minLeft + minRight, currentHuffmanTree);
      }
    }

    return huffmanTreeByText.values().next().value;
  }

  private addCodesToHuffmanTree(huffmanTree: Tree): Tree {
    return this.recursivelyAddCodesToHuffmanTree(huffmanTree);
  }

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
