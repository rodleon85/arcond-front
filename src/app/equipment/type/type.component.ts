import { Component, OnInit, ViewChild } from '@angular/core';
import { EqType } from 'src/app/_models/EqType';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent  implements OnInit {

  ELEMENT_DATA: EqType[] = [];
  errorMessage = '';
  type: EqType;
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<EqType>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipmentService: EquipmentService,
  ) {
    this.type = new EqType(0, '');
  }

  ngOnInit(): void {
    this.reloadDataSource();
  }

  onSubmit(): void {
    this.save(this.type);
  }

  discard(): void {
    this.type = new EqType(0, '');
  }

  save(eqType: EqType): void {
    if(this.type.name.length < 2) {
      this.errorMessage = 'Mínimo de 3 caracteres';
      return;
    }
    
    if (this.type) {
      // Call your service method to handle the form submission
      this.equipmentService.saveType(this.type).subscribe({
        next: response => {
          // Reset the form or handle success response
          this.reloadPage();
        },
        error: error => {
          console.error('Error saving type', error);
          // Handle error response
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  edit(eqType: EqType): void {
    this.type = eqType;
  }

  remove(id: number): void {
    this.equipmentService.deleteType(id).subscribe({
      next: response => {
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving type', error);
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
    this.equipmentService.getAllTypes().subscribe({
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


