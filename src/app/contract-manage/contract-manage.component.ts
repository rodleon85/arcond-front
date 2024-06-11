import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../_services/spinner.service';
import { Contract } from '../_models/Contract';
import { ContractService } from '../_services/contract.service';
import { ContractDocument } from '../_models/ContractDocument';
import { ContractDocumentService } from '../_services/contract-document.service';

@Component({
  selector: 'app-contract-manage',
  templateUrl: './contract-manage.component.html',
  styleUrls: ['./contract-manage.component.css']
})
export class ContractManageComponent implements OnInit {

  contractId: string | null = null;

  contract: Contract = {
    name: '',
    document: '',
    startValue: 0,
    currentValue: 0,
    installationValue: 0,
    dueDay: 0,
    startDate: new Date(),
    period: 0,
    readjustmentMonth: 0,
    address: { address: '' },
    contractDocumentList: [],
    contractEquipmentList: [],
    contactList: [],
    paymentList: [],
    supportRequestList: []
  };

  constructor(
    private spinnerService: SpinnerService,
    private contractService: ContractService,
    private documentService: ContractDocumentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.paramMap.subscribe(params => {
      this.contractId = params.get('id');
      this.loadContract();
    });
  }

  loadContract(): void {
    if (this.contractId) {
      this.contractService.getContract(Number(this.contractId)).subscribe({
        next: contract => {
          this.contract = contract;
          this.spinnerService.hide();
        },
        error: error => {
          console.error('Error loading contract', error);
          this.spinnerService.hide();  // Hide spinner in case of error
        }
      });
    }
  }

  downloadDoc(document: ContractDocument): void {
    if (document.id !== undefined) {
      this.documentService.downloadDocument(document.id).subscribe({
        next: (blob) => {
          this.documentService.saveFile(blob, document.name);
        },
        error: (err) => {
          console.error('Error downloading document', err);
        }
      });
    } else {
      console.error('Document ID is undefined');
    }
  }

}
