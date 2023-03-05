import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCode } from '../models/item-code';
import { Observable } from 'rxjs';


const tipos: ItemCode<string>[] = [
  { nome: "Carro", codigo: "carros" },
  { nome: "Moto", codigo: "motos" },
  { nome: "Caminhão", codigo: "caminhoes" }
];

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  rootURL = 'https://parallelum.com.br/fipe/api/v1/';

  getTipos() {
    return tipos;
  }

  getMarcas(codigoTipo: string): Observable<ItemCode<string>[]> {
    return this.http.get<ItemCode<string>[]>(this.rootURL + codigoTipo + '/marcas');
  }
}

