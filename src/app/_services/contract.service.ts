import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../_models/Contract';
import { environment } from 'src/environments/environment';
import { Payment } from '../_models/Payment';

const API_URL = environment.apiUrl + '/api/contract/';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  
  constructor(private http: HttpClient) {}

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(API_URL + `admin/all`);
  }

  getContract(id: number): Observable<Contract> {
    return this.http.get<Contract>(API_URL + `admin/${id}`);
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(API_URL + `admin/save`, contract, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `admin/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(API_URL + `payment/admin/`, payment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePayment(contractId: number, id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `${contractId}/payment/admin/${id}`);
  }

  getPayments(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(API_URL + `payment/admin/${id}`);
  }

}
