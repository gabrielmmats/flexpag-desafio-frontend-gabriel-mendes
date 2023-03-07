import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCode } from '../models/item-code';
import { Observable, throwError, of } from 'rxjs';
import { map, } from 'rxjs/operators';
import { CarInfo } from '../models/car-info';
import MockData from './car.service.mock';


//setar para true se for utilizar dados mockados
const mock = false;

const tipos: ItemCode<string>[] = [
  { nome: "Carro", codigo: "carros" },
  { nome: "Moto", codigo: "motos" },
  { nome: "Caminhão", codigo: "caminhoes" }
];


//servico responsavel por conectar-se ao servidor atraves de um cliente HTTP e buscar os valores de cada requisicao, retornando um objeto observavel
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
    if(mock) {
      return of(MockData.MOCK_MARCAS_RESPONSE);
    }
    return this.http.get<ItemCode<string>[]>(this.rootURL + codigoTipo + '/marcas');
  }

  getModelos(codigoTipo: string, codigoMarca: string): Observable<ItemCode<string>[]> {
    if(mock) {
      return of(MockData.MOCK_MODELOS_RESPONSE);
    }
    return this.http.get<ItemCode<bigint>[]>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos').pipe(map((data: any) => {
      return data.modelos.map( (item: ItemCode<bigint>) => ({nome: item.nome, codigo: String(item.codigo)}))
    }));
  }

  getAnos(codigoTipo: string, codigoMarca: string, codigoModelo: string): Observable<ItemCode<string>[]> {
    if(mock) {
      return of(MockData.MOCK_ANOS_RESPONSE);
    }
    return this.http.get<ItemCode<string>[]>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos');
  }

  getValor(codigoTipo: string, codigoMarca: string, codigoModelo: string, codigoAno: string): Observable<CarInfo> {
    if(mock) {
      return of(MockData.MOCK_VALOR_RESPONSE);
    }
    return this.http.get<CarInfo>(this.rootURL + codigoTipo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos/' + codigoAno);
  }
}

