import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

const API_URL = environment.apiUrl + '/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //ADMIN
  adminSaveUser(id: number, user: User): Observable<any> {
    return this.http.post<void>(API_URL + `admin/${id}`, user);
  }

  adminGetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL+`admin/all`);
  }

  adminDeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`admin/${id}`);
  }

  //USERS
  userDetails(id: number): Observable<User> {
    return this.http.get<User>(API_URL+`${id}`);
  }

  userUpdate(id: number, user: User): Observable<any> {
    return this.http.put<void>(API_URL + `${id}`, user);
  }

}
