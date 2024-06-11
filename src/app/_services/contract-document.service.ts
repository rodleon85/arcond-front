import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/api/contract/document/';

@Injectable({
  providedIn: 'root'
})
export class ContractDocumentService {
  
  constructor(private http: HttpClient) {}

  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(API_URL + `admin/${id}`, { responseType: 'blob' });
  }

  saveFile(blob: Blob, filename: string) {
    saveAs(blob, filename);
  }
 
  deleteContractEquipment(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `admin/${id}`);
  }
  
}
