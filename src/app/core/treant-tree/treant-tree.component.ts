import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ViewEncapsulation} from '@angular/core'
import {Tree} from '../models/tree';
import {NodeStructure} from '../models/node-structure';

// This object is loaded from Treant.js library
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-treant-tree',
  templateUrl: './treant-tree.component.html',
  styleUrls: ['./treant-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreantTreeComponent implements OnInit, OnChanges {
  @Input()
  huffmanTree: Tree | null = null;

  ngOnInit(): void {
    this.renderTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderTree();
  }

  private renderTree(): void {
    if (this.huffmanTree) {
      const nodeStructure = this.createNodeStructure(this.huffmanTree);
      const treeStructure = this.createTreeStructure(nodeStructure);

      Treant(treeStructure);
    }
  }

  private createTreeStructure(nodeStructure: NodeStructure): {} {
    return {
      chart: {
        container: '#treant-id',
        nodeAlign: 'BOTTOM',
        scrollbar: 'None',
        connectors: {
          type: 'bCurve',
          style: {
            'stroke-width': 1,
            'stroke-linecap': 'round',
            'arrow-end': 'classic-wide-long'
          }
        }
      },
      nodeStructure: nodeStructure
    };
  }

  private createNodeStructure(huffmanTree: Tree): NodeStructure {
    if (huffmanTree.right && huffmanTree.left) {
      return new NodeStructure(
        this.createNode(huffmanTree.value, undefined, undefined, huffmanTree.index),
        [
          this.createNodeStructure(huffmanTree.left),
          this.createNodeStructure(huffmanTree.right)
        ]
      );
    }

    if (huffmanTree.right) {
      return new NodeStructure(
        this.createNode(huffmanTree.value, huffmanTree.text, huffmanTree.code, huffmanTree.index),
        [this.createNodeStructure(huffmanTree.right)]
      );
    }

    if (huffmanTree.left) {
      return new NodeStructure(
        this.createNode(huffmanTree.value, huffmanTree.text, huffmanTree.code, huffmanTree.index),
        [this.createNodeStructure(huffmanTree.left)]
      );
    }

    return new NodeStructure(
      this.createNode(huffmanTree.value, huffmanTree.text, huffmanTree.code, huffmanTree.index),
      null);
  }

  private createNode(value: number, text?: string, code?: string, index?: number): string {
    let nodeHtml = '<table>';

    if (index) {
      nodeHtml += '</tr><tr><td colspan="2">' + index + '</td></tr>';
    }

    if (text && text != 'NYT') {
      switch (text) {
        case ' ':
          text = 'Spacja';
          break;
        case '\n':
          text = 'Nowa linia';
          break;
        case '\t':
          text = 'Tabulacja';
          break;
      }

      nodeHtml += '<tr><td>' + text + '</td><td>' + value + '</td></tr>';
      nodeHtml += '</tr><tr><td colspan="2">' + code + '</td></tr>';
    } else if (text == 'NYT') {
      nodeHtml += '<tr><td>' + text + '</td></tr>';
    } else {
      nodeHtml += '<tr><td>' + value + '</td></tr>';
    }

    nodeHtml += '</table>';
    return nodeHtml;
  }
}
