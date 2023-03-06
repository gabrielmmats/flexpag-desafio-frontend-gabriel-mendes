import { Component, Input } from '@angular/core';
import { CarInfo } from 'src/app/core/models/car-info';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  
  @Input() carInfo = {} as CarInfo;
  @Input() valorVeiculo = '';
  percentual = '';
  mensagem = {texto: 'Valor de mercado', tipo: 'neutro'};


  ngOnChanges() {
    console.log(this.valorVeiculo);
    let VVD = parseFloat(this.valorVeiculo);
    let VVF = parseFloat((this.carInfo.Valor || '').replace('R$', '').replace('.', ''));
    const p = ((VVD - VVF) / VVF) * 100;
    if (p >= 10) {
      this.mensagem = {texto: 'Valor acima do mercado', tipo: 'negativo'};
    }
    else if (p <= -10) {
      this.mensagem = {texto: 'Valor de mercado', tipo: 'neutro'};
    }
    else {
      this.mensagem = {texto: 'Valor abaixo do mercado', tipo: 'positivo'};
    }
    this.percentual = Math.abs(p).toFixed(2) + ' %';
  }
  
}
