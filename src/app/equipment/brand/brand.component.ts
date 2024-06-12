import { Component, OnInit, ViewChild } from '@angular/core';
import { EqBrand } from 'src/app/_models/EqBrand';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  ELEMENT_DATA: EqBrand[] = [];
  errorMessage = '';
  brand: EqBrand;
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<EqBrand>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipmentService: EquipmentService,
  ) {
    this.brand = new EqBrand(0, '');
  }

  ngOnInit(): void {
    this.reloadDataSource();
  }

  onSubmit(): void {
    this.save(this.brand);
  }

  discard(): void {
    this.brand = new EqBrand(0, '');
  }

  save(eqBrand: EqBrand): void {
    if(this.brand.name.length < 2) {
      this.errorMessage = 'Mínimo de 3 caracteres';
      return;
    }
    
    if (this.brand) {
      // Call your service method to handle the form submission
      this.equipmentService.saveBrand(this.brand).subscribe({
        next: response => {
          // Reset the form or handle success response
          this.reloadPage();
        },
        error: error => {
          console.error('Error saving brand', error);
          // Handle error response
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  edit(eqBrand: EqBrand): void {
    this.brand = eqBrand;
  }

  remove(id: number): void {
    this.equipmentService.deleteBrand(id).subscribe({
      next: response => {
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving brand', error);
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
    this.equipmentService.getAllBrands().subscribe({
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


