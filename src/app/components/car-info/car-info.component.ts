import { Component, Input } from '@angular/core';
import { CarInfo } from 'src/app/core/models/car-info';

//funcao auxiliar que deixa a primeira letra de uma string em maiusculo
const capitalizeFirstLetter = (str: string) => {
  if (str)
    return str.charAt(0).toUpperCase() + str.slice(1);
  else
    return "";
}

//componente responsavel por exibir o resultado da busca
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {

  //variaveis de entrada que guardam as informacoes recebidas pelo servidor e o valor inserido pelo usuario
  @Input() carInfo = {} as CarInfo;
  @Input() valorVeiculo = '';

  //variaveis que guardam as informacoes em formatos adequados para serem exibidas nos componentes
  percentual = '';
  message = {text: 'Valor de mercado', color: 'neutro', icon: "arrow_circle_down"};
  infoList = [{name: "", value: ""}];
  displayedColumns: string[] = ['name', 'value'];

  //atualiza as variaveis de exibicao de acordo com as variaveis de entrada quando ha uma mudanca
  ngOnChanges() {
    this.setTable();
    this.setPercentage();
  }

  //atualiza a tabela populando cada item e transformando alguns valores para melhores formatos de exibicao
  setTable() {
    const anoModelo = String(this.carInfo.AnoModelo || "");
    const valor = "R$ " + Number(this.valorVeiculo).toLocaleString(['pt-BR'], { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const referencia = capitalizeFirstLetter(this.carInfo.MesReferencia);
    this.infoList = [
      { name: "Marca:", value: this.carInfo.Marca },
      { name: "Modelo:", value: this.carInfo.Modelo },
      { name: "Ano do Modelo:", value: anoModelo },
      { name: "Código FIPE:", value: this.carInfo.CodigoFipe },
      { name: "Mês Referência:", value: referencia },
      { name: "Valor do veículo:", value: valor },
      { name: "Valor pela FIPE:", value: this.carInfo.Valor}
    ];
  }

  //calcula a diferenca percentual entre o valor do input e o da tabela FIP e atualiza o componente de acordo com o resultado
  setPercentage() {
    let VVD = parseFloat(this.valorVeiculo);
    let VVF = parseFloat((this.carInfo.Valor || '0').replace('R$', '').replace('.', '').replace(',', '.'));
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
