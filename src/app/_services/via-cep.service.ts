import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly API_URL = '/viacep';

  constructor(private http: HttpClient) { }

  getAddress(cep: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${cep}/json/`);
  }
}
