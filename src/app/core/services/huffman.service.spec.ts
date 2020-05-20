import {TestBed} from '@angular/core/testing';

import {HuffmanService} from './huffman.service';

describe('HuffmanService', () => {
  let service: HuffmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuffmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#createFrequencyTable should return frequency map', () => {
    expect(service.createFrequencyTable('test')).toEqual(new Map([['t', 2], ['e', 1], ['s', 1]]));
  });

  // it('#createHuffmanTree should return Huffman tree', () => {
  //   expect(service.createHuffmanTree(
  //     new Map([['t', 2], ['e', 1], ['s', 1]]))
  //   ).toEqual(
  //     {
  //       value: 4, text: 'est', left: {value: 1, text: 'e', code: '0'},
  //       right: {
  //         value: 3,
  //         text: 'st',
  //         left: {value: 1, text: 's', code: '10'},
  //         right: {value: 2, text: 't', code: '11'},
  //         code: '1'
  //       },
  //       code: ''
  //     }
  //   );
  // });
});
