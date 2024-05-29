import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Equipment } from '../_models/Equipment';
import { EqType } from '../_models/EqType';
import { EqBrand } from '../_models/EqBrand';
import { EqPower } from '../_models/EqPower';
import { EqModel } from '../_models/EqModel';
import { SpinnerService } from '../_services/spinner.service';


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  models: EqModel[] = [];
  types: EqType[] = [];
  brands: EqBrand[] = [];
  powers: EqPower[] = [];
  
  ELEMENT_DATA: Equipment[] = [];
  errorMessage = '';
  equipment: Equipment;
  displayedColumns: string[] = ['id', 'marca', 'tipo', 'modelo', 'potencia', 'acoes'];
  dataSource = new MatTableDataSource<Equipment>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipmentService: EquipmentService,
    private spinnerService: SpinnerService,
  ) {
    this.equipment = new Equipment(0, new EqModel(0, ''), new EqType(0, ''), new EqBrand(0, ''), new EqPower(0, ''));
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.createFilter();
    this.reloadDataSource();
    this.spinnerService.show();
    // Simulate a delay
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
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

  onSubmit(): void {
    this.save(this.equipment);
  }

  discard(): void {
    this.equipment = new Equipment(0, new EqModel(0, ''), new EqType(0, ''), new EqBrand(0, ''), new EqPower(0, ''));
  }

  save(equipment: Equipment): void {
    if(this.equipment.model.id === 0 || this.equipment.type.id === 0 || this.equipment.brand.id === 0 || this.equipment.power.id === 0) {
      this.errorMessage = 'Dados incompletos';
      return;
    }
    
    if (this.equipment) {
      // Call your service method to handle the form submission
      this.equipmentService.saveEquipment(this.equipment).subscribe({
        next: response => {
          console.log('Equipment saved successfully', response);
          // Reset the form or handle success response
          this.reloadPage();
        },
        error: error => {
          console.error('Error saving Equipment', error);
          // Handle error response
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  edit(equipment: Equipment): void {
    this.equipment = equipment;
  }

  remove(id: number): void {
    this.equipmentService.deleteEquipment(id).subscribe({
      next: response => {
        console.log('Equipment saved successfully', response);
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving Equipment', error);
        // Handle error response
        this.errorMessage = error.error.message;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  filtrar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value || ''; // Ensure we handle potential null values safely
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadDataSource(): void {
    this.loadModels();
    this.loadTypes();
    this.loadBrands();
    this.loadPowers();
    this.equipmentService.getAllEquipments().subscribe({
      next: response => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  loadModels(): void {
    this.equipmentService.getAllModels().subscribe({
      next: response => {
        this.models = response;
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  loadTypes(): void {
    this.equipmentService.getAllTypes().subscribe({
      next: response => {
        this.types = response;
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  loadBrands(): void {
    this.equipmentService.getAllBrands().subscribe({
      next: response => {
        this.brands = response;
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  loadPowers(): void {
    this.equipmentService.getAllPowers().subscribe({
      next: response => {
        this.powers = response;
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

}


