import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCode } from '../models/item-code';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarInfo } from '../models/car-info';


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

  //aqui a API esta retornando {modelos: [], anos: []} ao inves de so o array de modelos
  getModelos(codigoTipo: string, codigoMarca: string): Observable<ItemCode<string>[]> {
    return this.http.get<ItemCode<bigint>[]>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos').pipe(map((data: any) => {
      return data.modelos.map( (item: ItemCode<bigint>) => ({nome: item.nome, codigo: String(item.codigo)}))
    }));
  }

  getAnos(codigoTipo: string, codigoMarca: string, codigoModelo: string): Observable<ItemCode<string>[]> {
    return this.http.get<ItemCode<string>[]>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos');
  }

  getValor(codigoTipo: string, codigoMarca: string, codigoModelo: string, codigoAno: string): Observable<CarInfo> {
    return this.http.get<CarInfo>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos/' + codigoAno);
  }
}

