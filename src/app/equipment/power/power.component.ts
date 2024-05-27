import { Component, OnInit, ViewChild } from '@angular/core';
import { EqPower } from 'src/app/_models/EqPower';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {

  ELEMENT_DATA: EqPower[] = [];
  errorMessage = '';
  power: EqPower;
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<EqPower>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipmentService: EquipmentService,
  ) {
    this.power = new EqPower(0, '');
  }

  ngOnInit(): void {
    this.reloadDataSource();
  }

  onSubmit(): void {
    this.save(this.power);
  }

  discard(): void {
    this.power = new EqPower(0, '');
  }

  save(eqPower: EqPower): void {
    if(this.power.name.length < 2) {
      this.errorMessage = 'Mínimo de 3 caracteres';
      return;
    }
    
    if (this.power) {
      // Call your service method to handle the form submission
      this.equipmentService.savePower(this.power).subscribe({
        next: response => {
          console.log('Power saved successfully', response);
          // Reset the form or handle success response
          this.reloadPage();
        },
        error: error => {
          console.error('Error saving power', error);
          // Handle error response
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  edit(eqPower: EqPower): void {
    this.power = eqPower;
  }

  remove(id: number): void {
    this.equipmentService.deletePower(id).subscribe({
      next: response => {
        console.log('Power saved successfully', response);
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving power', error);
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
    this.equipmentService.getAllPowers().subscribe({
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


