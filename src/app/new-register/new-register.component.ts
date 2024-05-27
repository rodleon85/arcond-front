import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css']
})
export class NewRegisterComponent  implements OnInit {

  ELEMENT_DATA: User[] = [];
  errorMessage = '';
  user: User;
  displayedColumns: string[] = ['id', 'usuario', 'perfil', 'acoes'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user = new User(0, '', '', '', 0, '');
  }

  ngOnInit(): void {
    this.reloadDataSource();
  }

  onSubmit(): void {
    this.save(this.user);
  }

  save(user: User): void {
    if(user.username === '') {
      this.errorMessage = 'Dados incompletos';
      return;
    }

    if(user.password != '' && user.password.length < 6) {
      this.errorMessage = 'Senha deve ter no mínimo 6 caracteres';
      return;
    }
    
    if (user.id === 0) {
      // Call your service method to handle the form submission
      this.authService.register(user).subscribe({
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

  edit(user: User): void {
    this.user = user;
  }

  remove(id: number): void {
    this.userService.adminDeleteUser(id).subscribe({
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
    this.userService.adminGetAllUsers().subscribe({
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