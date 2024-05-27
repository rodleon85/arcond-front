import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../_models/Equipment';
import { EqBrand } from '../_models/EqBrand';
import { environment } from 'src/environments/environment';
import { EqModel } from '../_models/EqModel';
import { EqType } from '../_models/EqType';
import { EqPower } from '../_models/EqPower';

const API_URL = environment.apiUrl + '/api/';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  //EQUIPMENT
  saveEquipment(brand: Equipment): Observable<any> {
    return this.http.post<Equipment>(API_URL + `equipment/save`, brand);
  }

  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(API_URL+`equipment/all`);
  }

  deleteEquipment(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`equipment/${id}`);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(API_URL+`equipment/${id}`);
  }

  // BRAND
  saveBrand(brand: EqBrand): Observable<any> {
    return this.http.post<EqBrand>(API_URL + `eqbrand/save`, brand);
  }

  getAllBrands(): Observable<EqBrand[]> {
    return this.http.get<EqBrand[]>(API_URL+`eqbrand/all`);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`eqbrand/${id}`);
  }

  getBrandById(id: number): Observable<EqBrand> {
    return this.http.get<EqBrand>(API_URL+`eqbrand/${id}`);
  }


  // MODEL
  saveModel(model: EqModel): Observable<any> {
    return this.http.post<EqModel>(API_URL + `eqmodel/save`, model);
  }

  getAllModels(): Observable<EqModel[]> {
    return this.http.get<EqModel[]>(API_URL+`eqmodel/all`);
  }

  deleteModel(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`eqmodel/${id}`);
  }

  getModelById(id: number): Observable<EqModel> {
    return this.http.get<EqModel>(API_URL+`eqmodel/${id}`);
  }

  // TYPE
  saveType(type: EqType): Observable<any> {
    return this.http.post<EqType>(API_URL + `eqtype/save`, type);
  }

  getAllTypes(): Observable<EqType[]> {
    return this.http.get<EqType[]>(API_URL+`eqtype/all`);
  }

  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`eqtype/${id}`);
  }

  getTypeById(id: number): Observable<EqType> {
    return this.http.get<EqType>(API_URL+`eqtype/${id}`);
  }

  // POWER
  savePower(power: EqPower): Observable<any> {
    return this.http.post<EqType>(API_URL + `eqpower/save`, power);
  }

  getAllPowers(): Observable<EqPower[]> {
    return this.http.get<EqPower[]>(API_URL+`eqpower/all`);
  }

  deletePower(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`eqpower/${id}`);
  }

  getPowerById(id: number): Observable<EqPower> {
    return this.http.get<EqPower>(API_URL+`eqpower/${id}`);
  }
  
}
