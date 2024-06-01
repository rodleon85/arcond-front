import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Contract } from '../_models/Contract';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ViaCepService } from '../_services/via-cep.service';
import { Equipment, IndexedEquipment } from '../_models/Equipment';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EquipmentService } from '../_services/equipment.service';
import { SpinnerService } from '../_services/spinner.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MONTHS, ESTADOS } from '../_shared/constants';
import { Contact } from '../_models/Contact';


@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NewContractComponent implements OnInit {

  contactTemp: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  displayedColumns: string[] = ['id', 'marca', 'tipo', 'modelo', 'potencia', 'acoes'];
  displayedColumnsCadastro: string[] = ['marca', 'tipo', 'modelo', 'potencia', 'acoes'];
  displayedColumnsContato: string[] = ['nome', 'email', 'telefone', 'acoes'];
  ELEMENT_DATA_CONTATO: Contact[] = [];
  ELEMENT_DATA_CADASTRO: IndexedEquipment[] = [];
  ELEMENT_DATA: Equipment[] = [];
  dataSourceCadastro = new MatTableDataSource<IndexedEquipment>(this.ELEMENT_DATA_CADASTRO);
  dataSourceContato = new MatTableDataSource<Contact>(this.ELEMENT_DATA_CONTATO);
  dataSource = new MatTableDataSource<Equipment>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable) tableContato!: MatTable<Contact>;
  @ViewChild(MatTable) tableCadastro!: MatTable<Equipment>;
  


  contactList: Contact[] = [];

  cepSpinner: boolean = false;
  months = MONTHS;
  estados = ESTADOS;

  contract: Contract = {
    id: 0,
    name: '',
    document: '',
    startValue: 0,
    currentValue: 0,
    installationValue: 0,
    dueDay: 0,
    startDate: new Date(),
    period: 0,
    readjustmentMonth: 0,
    address: { id: 0, address: '' },
    documentList: [],
    equipmentList: [],
    contactList: [],
    paymentList: [],
    supportRequestList: []
  }; // Initialize the 'contract' property

  firstFormGroup = this._formBuilder.group({
    empnome: ['', Validators.required],
    documento: ['', Validators.required],
    cpfCnpj: ['', Validators.required],
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    numero: ['', [Validators.required, Validators.maxLength(6)]],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', Validators.required],
    data: ['', Validators.required],
    reajuste: ['', Validators.required],
    vencimento: ['', Validators.required],
    prazo: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({

  });

  thirdFormGroup = this._formBuilder.group({
   
  });


  constructor(
    private _formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private equipmentService: EquipmentService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dataSource.filterPredicate = this.createFilter();
    this.reloadDataSource();
    this.spinnerService.hide();
  }

  onSubmit(): void {
    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup.value);
    }
  }

  preventNonNumericalInput(event: KeyboardEvent): void {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
      event.preventDefault();
    }
  }

  validateNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    if (input.value.length > 14) {
      input.value = input.value.slice(0, 14);
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate) {
      const month = selectedDate.getMonth() + 1;
      console.log('Month:', month);
      this.contract.readjustmentMonth = month;
    }
  }

  onCepChange(event: any): void {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      this.cepSpinner = true;
      this.viaCepService.getAddress(cep).subscribe({
        next: data => {
          if (data) {
            this.firstFormGroup.patchValue({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              uf: data.uf
            });
          }
          this.cepSpinner = false;
        },
        error: error => {
          console.error('Error saving Equipment', error);
          this.cepSpinner = false;
        }
      });
    }
  }

  createFilter(): (data: Equipment, filter: string) => boolean {
    return (data: Equipment, filter: string): boolean => {
      const searchTerm = filter.trim().toLowerCase();
      return data.model.name.toLowerCase().includes(searchTerm) ||
        data.type.name.toLowerCase().includes(searchTerm) ||
        data.brand.name.toLowerCase().includes(searchTerm) ||
        data.power.name.toLowerCase().includes(searchTerm);
    };
  }

  filtrar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value || ''; // Ensure we handle potential null values safely
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadDataSource(): void {
    this.equipmentService.getAllEquipments().subscribe({
      next: response => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        console.log(error.error.message);
      }
    });
  }

  adicionarEqp(equipment: IndexedEquipment): void {
    const indexedEquipment: IndexedEquipment = {
      ...equipment,
      index: this.ELEMENT_DATA_CADASTRO.length
    };

    this.dataSourceCadastro.data.push(indexedEquipment);
    this.tableCadastro.renderRows();
  }

  removerEqp(): void {
    this.dataSourceCadastro.data.pop();
    this.tableCadastro.renderRows();
  }

  adicionarContato(): void {
    if (this.contactTemp.name != '') {
      const newContact: Contact = {
        ...this.contactTemp
      };
      this.dataSourceContato.data.push(newContact);
      this.dataSourceContato._updateChangeSubscription();
      this.contactTemp = {
        id: 0,
        name: '',
        email: '',
        phone: ''
      };
      
    }
    this.tableContato.renderRows();
  }

  removerContato(): void {
    this.dataSourceContato.data.pop();
    this.dataSourceContato._updateChangeSubscription();
    this.tableContato.renderRows();
  }

  resetForm(): void {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.dataSourceContato.data = [];
    this.dataSourceCadastro.data = [];
  }

}
