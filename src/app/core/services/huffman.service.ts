import {Injectable} from '@angular/core';
import {Tree} from '../models/tree';

@Injectable({
  providedIn: 'root'
})
export class HuffmanService {

  /**
   * Creates Huffman tree based on Vitter algorithm for given text.
   * @param text text for which the tree should be created
   */
  public createVitterHuffmanTree(text: string): Tree | null {
    if (text.length == 0) {
      return null;
    }

    let currentMaxIndex = 256;
    const flatTree: Tree[] = [];
    const listOfOccurs: string[] = [];

    let notYetTransformedNode: Tree = {
      text: 'NYT',
      index: currentMaxIndex,
      value: 0
    };
    const vitterHuffmanTree: Tree = notYetTransformedNode;
    flatTree.push(notYetTransformedNode);

    for (const char of text) {
      let leafToIncrement = null;
      let currentTree: Tree | null = null;

      if (!listOfOccurs.includes(char)) {
        notYetTransformedNode.text = '';
        notYetTransformedNode.left = new Tree(
          0,
          'NYT',
          undefined,
          currentMaxIndex - 2,
          undefined,
          undefined,
          notYetTransformedNode);

        notYetTransformedNode.right = new Tree(
          0,
          char,
          undefined,
          currentMaxIndex - 1,
          undefined,
          undefined,
          notYetTransformedNode);

        currentMaxIndex -= 2;
        flatTree.push(notYetTransformedNode.right);
        flatTree.push(notYetTransformedNode.left);

        currentTree = notYetTransformedNode;

        listOfOccurs.push(char);
        leafToIncrement = notYetTransformedNode.right;
        notYetTransformedNode = notYetTransformedNode.left;
      } else {
        const foundNode = flatTree.find(element => element.text == char);

        if (foundNode) {
          currentTree = foundNode;

          const blockNodes = flatTree.filter(
            element => currentTree && element.value == currentTree.value && element.right == undefined && element.left == undefined
          );
          const blockLeader = blockNodes.reduce(
            (previousHighestIndexTree, currentIndexTree) => {
              return previousHighestIndexTree.index && currentIndexTree.index
              && previousHighestIndexTree.index > currentIndexTree.index
                ? previousHighestIndexTree
                : currentIndexTree
            }
          );

          if (blockLeader != currentTree) {
            this.swap(currentTree, blockLeader);
          }

          if (currentTree.parentNode
            && (
              (currentTree.parentNode.left && currentTree.parentNode.left.text == 'NYT')
              || (currentTree.parentNode.right && currentTree.parentNode.right.text == 'NYT')
            )) {
            leafToIncrement = currentTree;
            currentTree = currentTree.parentNode;
          }
        }
      }

      while (currentTree != null) {
        currentTree = this.slideAndIncrement(currentTree, flatTree);
      }

      if (leafToIncrement != null) {
        this.slideAndIncrement(leafToIncrement, flatTree);
      }
    }

    if (vitterHuffmanTree) {
      this.addCodesToHuffmanTree(vitterHuffmanTree);
    }

    return vitterHuffmanTree;
  }

  /**
   * Updates Huffman tree to meet the conditions required by Vitter algorithm.
   * @param vitterHuffmanTree Huffman tree that should be updated
   * @param flatVitterHuffmanTree array of nodes that tree is composed of
   */
  private slideAndIncrement(vitterHuffmanTree: Tree, flatVitterHuffmanTree: Tree[]): Tree | null {
    let mainNode: Tree | null = vitterHuffmanTree;
    let root = mainNode.parentNode;
    let blockNodes: Tree[];

    if (mainNode.left && mainNode.right) {
      blockNodes = flatVitterHuffmanTree.filter(
        element => mainNode && element.value == mainNode.value + 1 && element.right == undefined && element.left == undefined && element.parentNode != undefined
      );
    } else {
      blockNodes = flatVitterHuffmanTree.filter(
        element => mainNode && element.value == mainNode.value && element.right && element.left && element.parentNode != undefined
      );
    }

    blockNodes.filter(blockNode => (mainNode && blockNode.index && mainNode.index && blockNode.index > mainNode.index));
    blockNodes.sort((nodeA, nodeB) => {return nodeA.index && nodeB.index ? nodeA.index - nodeB.index : 0});

    let nextNode = blockNodes.shift();
    while (nextNode) {
      this.swap(mainNode, nextNode);
      nextNode = blockNodes.shift();
    }

    mainNode.value++;
    if (root && mainNode.left && mainNode.right) {
      mainNode = root;
    } else {
      if (mainNode.parentNode) {
        mainNode = mainNode.parentNode;
      } else {
        mainNode = null;
      }
    }

    return mainNode;
  }

  /**
   * Creates Huffman tree based on FGK algorithm for given text.
   * @param text text for which the tree should be created
   */
  public createFgkHuffmanTree(text: string): Tree | null {
    if (text.length == 0) {
      return null;
    }

    let currentMaxIndex = 256;
    const flatTree: Tree[] = [];
    const listOfOccurs: string[] = [];

    let notYetTransformedNode: Tree = {
      text: 'NYT',
      index: currentMaxIndex,
      value: 0
    };
    const fgkHuffmanTree: Tree = notYetTransformedNode;
    flatTree.push(notYetTransformedNode);

    for (const char of text) {
      if (!listOfOccurs.includes(char)) {
        notYetTransformedNode.text = '';
        notYetTransformedNode.left = new Tree(
          0,
          'NYT',
          undefined,
          currentMaxIndex - 2,
          undefined,
          undefined,
          notYetTransformedNode);

        notYetTransformedNode.right = new Tree(
          1,
          char,
          undefined,
          currentMaxIndex - 1,
          undefined,
          undefined,
          notYetTransformedNode);

        if (notYetTransformedNode.parentNode) {
          this.updateFgkHuffmanTree(notYetTransformedNode.parentNode, flatTree);
        }

        notYetTransformedNode.value = 1;
        currentMaxIndex -= 2;
        flatTree.push(notYetTransformedNode.right);
        flatTree.push(notYetTransformedNode.left);
        listOfOccurs.push(char);

        notYetTransformedNode = notYetTransformedNode.left;
      } else {
        const currentTree = flatTree.find(element => element.text == char);

        if (currentTree) {
          this.updateFgkHuffmanTree(currentTree, flatTree);
        }
      }
    }

    if (fgkHuffmanTree) {
      this.addCodesToHuffmanTree(fgkHuffmanTree);
    }

    return fgkHuffmanTree;
  }

  /**
   * Creates a frequency map of each letter in the given text.
   * @param {string} text text that should have frequency map calculated for
   * @returns frequency table
   */
  public createFrequencyTable(text: string): Map<string, number> {
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
  public createHuffmanTree(frequencyTable: Map<string, number>): Tree | null {
    const frequencyTableCopy: Map<string, number> = new Map<string, number>(frequencyTable);

    let huffmanTree: Tree | null = null;
    if (frequencyTableCopy.size == 0) {
      return huffmanTree;
    }

    if (frequencyTableCopy.size == 1) {
      // Tree contains only one node so it should be root node
      huffmanTree = {
        value: 1,
        text: frequencyTableCopy.keys().next().value,
        code: '1',
        parentNode: {value: 1}
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
   * Creates array of nodes that are leaves in given Huffman tree.
   * @param {Tree} huffmanTree Huffman tree
   * @returns Array of nodes
   */
  public getLeavesFromHuffmanTree(huffmanTree: Tree): Tree[] {
    const huffmanTreeLeaves: Tree[] = [];

    if (huffmanTree.left) {
      huffmanTreeLeaves.push(
        ...this.getLeavesFromHuffmanTree(huffmanTree.left)
      );
    }

    if (huffmanTree.right) {
      huffmanTreeLeaves.push(
        ...this.getLeavesFromHuffmanTree(huffmanTree.right)
      );
    }

    if (!huffmanTree.left && !huffmanTree.right) {
      if (huffmanTree.text != 'NYT') {
        return [huffmanTree];
      } else {
        return [];
      }
    }

    return huffmanTreeLeaves;
  }

  /**
   * Calculates entropy value in table of Huffman codes.
   * @param huffmanCodingTable array of nodes containing coding and number of occurs
   * @returns value of entropy
   */
  public calculateEntropy(huffmanCodingTable: Tree[]): number {
    let entropyValue = 0;
    let numberOfCodes = 0;

    for (const huffmanCoding of huffmanCodingTable) {
      numberOfCodes += huffmanCoding.value;
    }

    for (const huffmanCoding of huffmanCodingTable) {
      const probability = huffmanCoding.value / numberOfCodes;
      entropyValue += probability * Math.log2(1 / probability);
    }

    return Number(entropyValue.toFixed(2));
  }

  /**
   * Calculates average length of coding word in table of Huffman codes.
   * @param huffmanCodingTable array of nodes containing coding and number of occurs
   * @returns average length of coding word
   */
  public calculateAverageLengthOfCodingWord(huffmanCodingTable: Tree[]): number {
    let averageLengthOfCodingWord = 0;
    let numberOfCodes = 0;

    for (const huffmanCoding of huffmanCodingTable) {
      numberOfCodes += huffmanCoding.value;
    }

    for (const huffmanCoding of huffmanCodingTable) {
      const probability = huffmanCoding.value / numberOfCodes;

      if (huffmanCoding.code) {
        averageLengthOfCodingWord += probability * huffmanCoding.code.length;
      }
    }

    return Number(averageLengthOfCodingWord.toFixed(2));
  }

  /**
   * Updates Huffman tree to meet the conditions required by FGK algorithm that FGK tree must have a sibling property
   * and the nodes should be listed in order of non-increasing weight with each node adjacent to its sibling.
   * @param fgkHuffmanTree Huffman tree that should be updated
   * @param flatFgkHuffmanTree array of nodes that tree is composed of
   */
  private updateFgkHuffmanTree(fgkHuffmanTree: Tree, flatFgkHuffmanTree: Tree[]): void {
    const blockNodes = flatFgkHuffmanTree.filter(
      element => element.value == fgkHuffmanTree.value && element != fgkHuffmanTree.parentNode
    );
    const highestIndexNode = blockNodes.reduce(
      (previousHighestIndexTree, currentIndexTree) => {
        return previousHighestIndexTree.index && currentIndexTree.index
        && previousHighestIndexTree.index > currentIndexTree.index
          ? previousHighestIndexTree
          : currentIndexTree
      }
    );

    if (fgkHuffmanTree.index && highestIndexNode.index && fgkHuffmanTree.index < highestIndexNode.index) {
      this.swap(fgkHuffmanTree, highestIndexNode);
    }
    fgkHuffmanTree.value += 1;

    if (fgkHuffmanTree.parentNode) {
      this.updateFgkHuffmanTree(fgkHuffmanTree.parentNode, flatFgkHuffmanTree);
    }
  }

  /**
   * Swaps two nodes in Huffman tree and keeps their indexes in place.
   * @param nodeA node A that should be swapped with node B
   * @param nodeB node B that should be swapped with node A
   */
  private swap(nodeA: Tree, nodeB: Tree): void {
    if (nodeA && nodeB && nodeA.parentNode && nodeB.parentNode) {
      if (nodeA.parentNode.index == nodeB.parentNode.index) {
        if (nodeA.parentNode.left == nodeB) {
          nodeA.parentNode.left = nodeA;
          nodeA.parentNode.right = nodeB;
        } else {
          nodeA.parentNode.left = nodeB;
          nodeA.parentNode.right = nodeA;
        }
      } else {
        if (nodeA.parentNode.left && (nodeA.parentNode.left.index == nodeA.index)) {
          nodeA.parentNode.left = nodeB;
        } else {
          nodeA.parentNode.right = nodeB;
        }

        if (nodeB.parentNode.left && (nodeB.parentNode.left.index == nodeB.index)) {
          nodeB.parentNode.left = nodeA;
        } else {
          nodeB.parentNode.right = nodeA;
        }

        const tempParent = nodeB.parentNode;
        nodeB.parentNode = nodeA.parentNode;
        nodeA.parentNode = tempParent;
      }

      const tempId = nodeA.index;
      nodeA.index = nodeB.index;
      nodeB.index = tempId;
    }
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
        } else if (minValueOnLeft != null && minValueOnRight != null) {

          if (minValueOnRight > value) {
            if (minValueOnLeft > minValueOnRight) {
              minValueOnLeft = minValueOnRight;
              letterWithMinValueOnLeft = letterWithMinValueOnRight;
            }

            minValueOnRight = value;
            letterWithMinValueOnRight = letter;
          } else if (minValueOnLeft > value) {
            if (minValueOnRight > minValueOnLeft) {
              minValueOnRight = minValueOnLeft;
              letterWithMinValueOnRight = letterWithMinValueOnLeft;
            }

            minValueOnLeft = value;
            letterWithMinValueOnLeft = letter;
          }
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
    if (side && huffmanTree.text != 'NYT') {
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
