import {Component, ViewChild} from '@angular/core';
import {HuffmanService} from '../services/huffman.service';
import {Tree} from '../models/tree';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.scss']
})
export class HuffmanComponent {
  formGroup: FormGroup;
  huffmanTree: Tree | null;
  dataSource: MatTableDataSource<Tree>;
  sort: MatSort;
  filterValue: string | null;

  displayedColumns: string[] = ['text', 'value', 'code'];
  isInputTextFilled = true;
  display = 'showTree';

  @ViewChild(MatSort, {static: false}) set matSort(matSort: MatSort) {
    if (matSort){
      this.sort = matSort;
      this.dataSource.sort = this.sort;
    }
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private huffmanService: HuffmanService,
              private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputText: ['', Validators.required]
    });

    this.huffmanTree = null;

    this.dataSource = new MatTableDataSource<Tree>();
    this.sort = new MatSort();
    this.paginator = null;
    this.filterValue = null;
  }

  submit(): void {
    if (this.formGroup) {
      this.isInputTextFilled = this.formGroup.valid
        && this.formGroup.get('inputText')
        && this.formGroup.get('inputText')?.getError('required');

      this.huffmanTree = this.huffmanService.createHuffmanTree(
        this.huffmanService.createFrequencyTable(this.formGroup.get('inputText')?.value)
      );

      if (this.huffmanTree != null) {
        this.dataSource = new MatTableDataSource<Tree>(
          this.huffmanService.getLeavesFromHuffmanTree(this.huffmanTree)
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.filterValue !== null) {
          this.dataSource.filter = this.filterValue;
        }
      }
    }
  }

  applyFilter(filterEvent: KeyboardEvent): void {
    const key = (filterEvent.target as HTMLInputElement).value;
    this.filterValue = key.trim().toLowerCase();
    this.dataSource.filter = key.trim().toLowerCase();
  }
}
