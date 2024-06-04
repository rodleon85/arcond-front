import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Contract } from '../_models/Contract';
import { SpinnerService } from '../_services/spinner.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent  implements OnInit {

  
  ELEMENT_DATA: Contract[] = [];
  errorMessage = '';
  displayedColumns: string[] = ['id', 'nome', 'document', 'valor', 'vencimento', 'payment', 'acoes'];
  dataSource = new MatTableDataSource<Contract>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tableContato!: MatTable<Contract>;

  constructor(
    private contractService: ContractService,
    private spinnerService: SpinnerService,
    private router: Router,
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
    this.router.navigate(['/contracts/edit', contract.id]);
  }

  remove(id: number): void {
    this.spinnerService.show();
    this.contractService.deleteContract(id).subscribe({
      next: response => {
        this.dataSource.data = this.dataSource.data.filter(contract => contract.id !== id);
        this.dataSource._updateChangeSubscription();
        this.tableContato.renderRows();
        this.spinnerService.hide();
      },
      error: error => {
        console.error('Error saving Contract', error);
        this.errorMessage = error.error.message;
        this.spinnerService.hide();
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
        console.log(response);
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


