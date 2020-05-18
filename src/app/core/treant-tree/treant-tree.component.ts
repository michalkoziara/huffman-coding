import {Component, OnInit} from '@angular/core';
import {ViewEncapsulation} from '@angular/core'

// This object is loaded from Treant.js library
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-treant-tree',
  templateUrl: './treant-tree.component.html',
  styleUrls: ['./treant-tree.component.scss']
})
export class TreantTreeComponent implements OnInit {
  private template = '<table border="1"><tr><td>$1</td><td>$2</td></tr><tr><td>$3</td><td>$4</td></tr></table>';
  private regex = /(\w+)\s(\w+)\s(\w+)\s(\w+)/;

  private tree_structure = {
    chart: {
      container: '#treant-id',
      nodeAlign: 'BOTTOM',
      connectors: {
        type: 'bCurve',
        style: {
          'stroke-width': 2,
          'stroke-linecap': 'round'
        }
      }
    },
    nodeStructure: {
      innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
      children: [
        {
          innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
          children: [
            {
              innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
            },
            {
              innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
            }
          ]
        },
        {
          innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
          children: [
            {
              innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
            },
            {
              innerHTML: 'raz dwa trzy cztery'.replace(this.regex, this.template),
            }
          ]
        }
      ]
    }
  };

  ngOnInit(): void {
    ((): void => {
      Treant(this.tree_structure)
    })();
  }
}
