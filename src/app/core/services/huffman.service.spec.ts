import { TestBed } from '@angular/core/testing';

import { HuffmanService } from './huffman.service';

describe('HuffmanService', () => {
  let service: HuffmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuffmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
