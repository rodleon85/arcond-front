import { TestBed } from '@angular/core/testing';

import { ContractDocumentService } from './contract-document.service';

describe('ContractDocumentService', () => {
  let service: ContractDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
