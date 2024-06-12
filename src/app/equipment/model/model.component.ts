import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EqModel } from 'src/app/_models/EqModel';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  ELEMENT_DATA: EqModel[] = [];
  errorMessage = '';
  model: EqModel;
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<EqModel>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipmentService: EquipmentService,
  ) {
    this.model = new EqModel(0, '');
  }

  ngOnInit(): void {
    this.reloadDataSource();
  }

  onSubmit(): void {
    this.save(this.model);
  }

  discard(): void {
    this.model = new EqModel(0, '');
  }

  save(EqModel: EqModel): void {
    if(this.model.name.length < 2) {
      this.errorMessage = 'Mínimo de 3 caracteres';
      return;
    }
    
    if (this.model) {
      // Call your service method to handle the form submission
      this.equipmentService.saveModel(this.model).subscribe({
        next: response => {
          // Reset the form or handle success response
          this.reloadPage();
        },
        error: error => {
          console.error('Error saving Model', error);
          // Handle error response
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  edit(EqModel: EqModel): void {
    this.model = EqModel;
  }

  remove(id: number): void {
    this.equipmentService.deleteModel(id).subscribe({
      next: response => {
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving Model', error);
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
    this.equipmentService.getAllModels().subscribe({
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

}


