import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Contract } from '../_models/Contract';
import { SpinnerService } from '../_services/spinner.service';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent  implements OnInit {

  
  ELEMENT_DATA: Contract[] = [];
  errorMessage = '';
  displayedColumns: string[] = ['id', 'nome', 'document', 'valor', 'vencimento', 'acoes'];
  dataSource = new MatTableDataSource<Contract>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contractService: ContractService,
    private spinnerService: SpinnerService,
  ) {
  }

  ngOnInit(): void {
    // this.dataSource.filterPredicate = this.createFilter();
    this.reloadDataSource();
  }

  // createFilter(): (data: Contract, filter: string) => boolean {
  //   return (data: Contract, filter: string): boolean => {
  //     const searchTerm = filter.trim().toLowerCase();
  //     return data.model.name.toLowerCase().includes(searchTerm) ||
  //            data.type.name.toLowerCase().includes(searchTerm) ||
  //            data.brand.name.toLowerCase().includes(searchTerm) ||
  //            data.power.name.toLowerCase().includes(searchTerm);
  //   };
  // }

  edit(contract: Contract): void {
  }

  remove(id: number): void {
    this.contractService.deleteContract(id).subscribe({
      next: response => {
        console.log('Contract saved successfully', response);
        // Reset the form or handle success response
        this.reloadPage();
      },
      error: error => {
        console.error('Error saving Contract', error);
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
    this.spinnerService.show();
    this.contractService.getContracts().subscribe({
      next: response => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinnerService.hide();
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.spinnerService.hide();
      }
    });
  }
}


