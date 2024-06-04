import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../_models/Contract';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/api/contract/';

@Injectable({
  providedIn: 'root'
})
export class ContractDocumentService {
  
  constructor(private http: HttpClient) {}

  getDocument(id: number): Observable<Contract> {
    return this.http.get<Contract>(API_URL + `admin/${id}`);
  }
 
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `admin/${id}`);
  }
  
}
