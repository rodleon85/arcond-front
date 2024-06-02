import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
import { ContractDocument } from '../_models/ContractDocument';


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
  displayedColumnsDocumentos: string[] = ['arquivo', 'acoes'];
  ELEMENT_DATA_CONTATO: Contact[] = [];
  ELEMENT_DATA_CADASTRO: IndexedEquipment[] = [];
  ELEMENT_DATA: Equipment[] = [];
  ELEMENT_DATA_DOCUMENTOS: ContractDocument[] = [];
  dataSourceDocumentos = new MatTableDataSource<ContractDocument>(this.ELEMENT_DATA_DOCUMENTOS);
  dataSourceCadastro = new MatTableDataSource<IndexedEquipment>(this.ELEMENT_DATA_CADASTRO);
  dataSourceContato = new MatTableDataSource<Contact>(this.ELEMENT_DATA_CONTATO);
  dataSource = new MatTableDataSource<Equipment>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable) tableContato!: MatTable<Contact>;
  @ViewChild(MatTable) tableCadastro!: MatTable<Equipment>;
  @ViewChild(MatTable) tableDocumentos!: MatTable<ContractDocument>;

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

  mainFormGroup: FormGroup;

  maxSize = 3 * 1024 * 1024; // 3MB in bytes
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private equipmentService: EquipmentService,
    private spinnerService: SpinnerService,
  ) {
    this.mainFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          empnome: ['', Validators.required],
          documento: ['', Validators.required],
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
          proposta: [''],
          assinada: [false],
          valorIni: [0],
          valorAtu: [0],
          valorInst: [0],
        }),
        this._formBuilder.group({ }),
        this._formBuilder.group({ }),
        this._formBuilder.group({ }),
      ])
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dataSource.filterPredicate = this.createFilter();
    this.reloadDataSource();
    this.spinnerService.hide();
  }

  get formArray(): FormArray {
    return this.mainFormGroup.get('formArray') as FormArray;
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
      this.formArray.at(0).patchValue({ reajuste: month });
    }
  }

  onCepChange(event: any): void {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      this.cepSpinner = true;
      this.viaCepService.getAddress(cep).subscribe({
        next: data => {
          if (data) {
            this.formArray.at(0).patchValue({
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
    this.dataSourceCadastro._updateChangeSubscription();
    this.tableCadastro.renderRows();

  }

  removerEqp(): void {
    this.dataSourceCadastro.data.pop();
    this.dataSourceCadastro._updateChangeSubscription();
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

  adicionarArquivo(fileInputEvent: any): void {
    const file = fileInputEvent.target.files[0];
    if (file.size > this.maxSize) {
      
      this.errorMessage = 'Tamanho do arquivo excede o limite de 3MB.';
      
      return;
    }
    this.errorMessage = null;
    this.dataSourceDocumentos.data.push({
      id: 0,
      name: fileInputEvent.target.files[0].name,
      file: fileInputEvent.target.files[0],
      type: fileInputEvent.target.files[0].type,
    });
    this.dataSourceDocumentos._updateChangeSubscription();
    this.tableDocumentos.renderRows();
  }

  removerArquivo(): void {
    this.dataSourceDocumentos.data.pop();
    this.dataSourceDocumentos._updateChangeSubscription();
    this.tableDocumentos.renderRows();
  }

  resetForm(): void {
    this.mainFormGroup.reset();
    this.dataSourceContato.data = [];
    this.dataSourceCadastro.data = [];
    this.dataSourceDocumentos.data = [];
  }

  onSubmit(): void {
    console.log('Submit')
    if (this.mainFormGroup.valid) {
      console.log('valid')
      const firstFormGroup = this.formArray.at(0) as FormGroup;
      this.contract.name = new String(firstFormGroup.get('empnome')?.value);
      this.contract.document = new String(firstFormGroup.get('documento')?.value);
      this.contract.proposal = new String(firstFormGroup.get('proposta')?.value);
      this.contract.signature = new String(firstFormGroup.get('assinada')?.value);
      this.contract.startValue = new Number(firstFormGroup.get('valorIni')?.value);
      this.contract.currentValue = new Number(firstFormGroup.get('valorAtu')?.value);
      this.contract.installationValue = new Number(firstFormGroup.get('valorInst')?.value);
      this.contract.dueDay = new Number(firstFormGroup.get('vencimento')?.value);
      this.contract.period = new Number(firstFormGroup.get('prazo')?.value);
      const dateValue = firstFormGroup.get('data')?.value;
      if (dateValue) {
        this.contract.startDate = new Date(dateValue);
      }
      this.contract.readjustmentMonth = new Number(firstFormGroup.get('reajuste')?.value);
      this.contract.address = {
        id: 0,
        address: firstFormGroup.get('logradouro')?.value,
        number: firstFormGroup.get('numero')?.value,
        complement: firstFormGroup.get('complemento')?.value,
        neighborhood: firstFormGroup.get('bairro')?.value,
        city: firstFormGroup.get('cidade')?.value,
        state: firstFormGroup.get('uf')?.value,
        zipcode: firstFormGroup.get('cep')?.value
      };
      this.contract.equipmentList = this.dataSourceCadastro.data.map((equipment: IndexedEquipment) => {
        return {
          id: equipment.id,
          model: equipment.model,
          type: equipment.type,
          brand: equipment.brand,
          power: equipment.power
        };
      }),
      this.contract.contactList = this.dataSourceContato.data;
      this.contract.documentList = this.dataSourceDocumentos.data;
      console.log(this.contract);
    }
  }

  // getFormValidationErrors() {
  //   const formArray = this.mainFormGroup.get('formArray') as FormArray;

  //   formArray.controls.forEach((group, groupIndex) => {
  //     const formGroup = group as FormGroup;

  //     Object.keys(formGroup.controls).forEach(key => {
  //       const controlErrors: ValidationErrors | null = formGroup.get(key)?.errors ?? null;
  //       if (controlErrors != null) {
  //         Object.keys(controlErrors).forEach(keyError => {
  //           console.log(`Group: ${groupIndex}, Key control: ${key}, keyError: ${keyError}, err value:`, controlErrors[keyError]);
  //         });
  //       }
  //     });
  //   });
  // }

}
