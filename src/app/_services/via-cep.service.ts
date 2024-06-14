import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) { }

  getAddress(cep: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/viacep/${cep}/json`);
  }
}
