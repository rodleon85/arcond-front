import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../_services/spinner.service';
import { Contract } from '../_models/Contract';
import { ContractService } from '../_services/contract.service';
import { ContractDocument } from '../_models/ContractDocument';
import { ContractDocumentService } from '../_services/contract-document.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from '../_models/Payment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contract-manage',
  templateUrl: './contract-manage.component.html',
  styleUrls: ['./contract-manage.component.css']
})
export class ContractManageComponent implements OnInit, AfterViewInit {

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

  ELEMENT_DATA: Payment[] = [];
  dataSource = new MatTableDataSource<Payment>;
  displayedColumns: string[] = ['data', 'valor', 'acoes'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paymentForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private contractService: ContractService,
    private documentService: ContractDocumentService,
    private route: ActivatedRoute,
  ) {
    this.paymentForm = this._formBuilder.group({
      value: [0],
      paymentDate: ['']
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.paramMap.subscribe(params => {
      this.contractId = params.get('id');
      this.loadContract();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadContract(): void {
    if (this.contractId) {
      this.contractService.getContract(Number(this.contractId)).subscribe({
        next: contract => {
          this.contract = contract;
          this.reloadDataSource(this.contract.paymentList);
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

  reloadDataSource(payments: Payment[]): void {
    this.dataSource.data = payments;
  }

  filtrar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value || ''; // Ensure we handle potential null values safely
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addPayment() {
    if (this.contractId) {
      const payment: Payment = {
        value: this.paymentForm.value.value,
        paymentDate: this.paymentForm.value.paymentDate
      };

      this.dataSource.data.push(payment);
      this.dataSource._updateChangeSubscription();
      
      
      // this.table.renderRows();

      // this.contractService.addPayment(Number(this.contractId), payment).subscribe({
      //   next: (newPayment) => {
      //     this.contract.paymentList.push(newPayment);
      //     this.reloadDataSource(this.contract.paymentList);
      //     this.paymentForm.reset();
      //   },
      //   error: (err) => {
      //     console.error('Error adding payment', err);
      //   }
      // });
    }
  }

  excluirPagamento(_t202: any) {
    throw new Error('Method not implemented.');
  }

}
