import { Component, Input } from '@angular/core';
import { CarInfo } from 'src/app/core/models/car-info';

export interface InfoList {
  name: string;
  value: any;
}

const ELEMENT_DATA: InfoList[] = [
  {name: "Valor", value: 20},
  {name: "Preco", value: "abacaxi"},
  {name: "FAIN", value: 450455},
];

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {

  _valorVeiculo = '';  
  @Input() carInfo = {} as CarInfo;
  @Input() set valorVeiculo(value: string) {
    this._valorVeiculo = value;
  }  
  get valorVeiculo(): string {
    return this._valorVeiculo.replace(',', '.');
  }
  percentual = '';
  infoList = [{name: "", value: ""}];
  displayedColumns: string[] = ['name', 'value'];
  message = {text: 'Valor de mercado', color: 'neutro', icon: "arrow_circle_down"};


  ngOnChanges() {
    this.carInfo = {
      "Valor": "R$ 125.318,00",
      "Marca": "VW - VolksWagen",
      "Modelo": "AMAROK High.CD 2.0 16V TDI 4x4 Dies. Aut",
      "AnoModelo": 2014n,
      "Combustivel": "Diesel",
      "CodigoFipe": "005340-6",
      "MesReferencia": "janeiro de 2023 ",
      "TipoVeiculo": 1n,
      "SiglaCombustivel": "D"
  }
    this.valorVeiculo = "100055,334"; 
    this.setTable();
    this.setPercentage();
  }

  setTable() {
    const anoModelo = String(this.carInfo.AnoModelo || "");
    const valor = "R$ " + Number(this.valorVeiculo).toLocaleString(['pt-BR'], { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.infoList = [
      { name: "Marca", value: this.carInfo.Marca },
      { name: "Modelo", value: this.carInfo.Modelo },
      { name: "Ano do Modelo", value: anoModelo },
      { name: "Código FIPE", value: this.carInfo.CodigoFipe },
      { name: "Mês Referência", value: this.carInfo.MesReferencia },
      { name: "Valor do veículo", value: valor },
      { name: "Valor pela FIPE", value: this.carInfo.Valor}
    ]
  }

  setPercentage() {
    let VVD = parseFloat(this.valorVeiculo);
    let VVF = parseFloat((this.carInfo.Valor || '').replace('R$', '').replace('.', ''));
    const p = ((VVD - VVF) / VVF) * 100;
    if (p >= 10) {
      this.message = {text: 'Valor acima do mercado', color: 'negativo', icon: "arrow_circle_up"};
    }
    else if (p <= -10) {
      this.message = {text: 'Valor abaixo do mercado', color: 'positivo', icon: "arrow_circle_down"};
    }
    else {
      this.message = {text: 'Valor de mercado', color: 'neutro', icon: "check_circle_outline"};
    }
    this.percentual = Math.abs(p).toFixed(2) + ' %';
  }
  
}
