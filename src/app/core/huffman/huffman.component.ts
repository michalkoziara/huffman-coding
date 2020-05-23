import {Component} from '@angular/core';
import {HuffmanService} from '../services/huffman.service';
import {Tree} from '../models/tree';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.scss']
})
export class HuffmanComponent {
  formGroup: FormGroup;
  huffmanTree: Tree | null;

  isInputTextFilled = true;

  constructor(private huffmanService: HuffmanService,
              private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputText: ['', Validators.required]
    });

    this.huffmanTree = null;
  }

  submit(): void {
    if (this.formGroup) {
      this.isInputTextFilled = this.formGroup.valid
        && this.formGroup.get('inputText')
        && this.formGroup.get('inputText')?.getError('required');

      this.huffmanTree = this.huffmanService.createHuffmanTree(
        this.huffmanService.createFrequencyTable(this.formGroup.get('inputText')?.value)
      );
    }
  }
}
