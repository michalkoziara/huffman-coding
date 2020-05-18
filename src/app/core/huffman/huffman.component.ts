import { Component } from '@angular/core';
import {HuffmanService} from '../services/huffman.service';

@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.scss']
})
export class HuffmanComponent {

  constructor(private huffmanService: HuffmanService) { }
}
