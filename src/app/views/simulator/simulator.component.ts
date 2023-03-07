import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemCode } from 'src/app/core/models/item-code';
import { CarInfo } from 'src/app/core/models/car-info';


//funcao auxiliar que valida se o input é um numero ponto flutuante separado por vírgula
function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notANumber = isNaN((control.value).replace(',', '.'));
    return notANumber ? {nan: {value: control.value}} : null;
  };
}

//componente responsável pelo form e por mandar os dados para o componente de exibição
@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit{

  //listas de valores dos seletores
  tiposDeVeiculo: ItemCode<string>[] = [];
  marcasDeVeiculo: ItemCode<string>[] = [];
  modelosDeVeiculo: ItemCode<string>[] = [];
  anosDeVeiculo: ItemCode<string>[] = [];

  //inputs para o componente de exibição
  carInfo = {} as CarInfo;
  valorVeiculo = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private carService: CarService, private snackBar: MatSnackBar) {}

  //popula o primeiro seletor ao iniciar
  ngOnInit() {
    this.tiposDeVeiculo = this.carService.getTipos();
  }
  
  //preenche o form com valores iniciais e seus validadores
  carForm = this.formBuilder.group({
    tipo: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    ano: ['', [Validators.required]],
    valor: ['', [Validators.required, numberValidator()]]
  });

  //atalhos para os valores do formulario
  get tipoValue() { 
    return this.carForm.value.tipo || '';
  }

  get marcaValue() { 
    return this.carForm.value.marca || '';
  }

  get modeloValue() {
    return this.carForm.value.modelo || '';
  }

  get anoValue() {
    return this.carForm.value.ano || '';
  }

  get valorValue() {
    return this.carForm.value.valor || '';
  }

  //funcoes responsaveis por inicializar os possíveis valores dos proximos seletores ao mudar o valor de um deles
  onSelectTipo() {
    this.clearMarcas();
    this.carService.getMarcas(this.tipoValue).subscribe({
      next: data => {
        this.marcasDeVeiculo = data;
      },
      error: err => {
        this.showErrorMessage();
      }
    });
  }

  onSelectMarca() {
    this.clearModelos();
    this.carService.getModelos(this.tipoValue, this.marcaValue).subscribe({
      next: data => {
        this.modelosDeVeiculo = data;
      },
      error: err => {
        this.showErrorMessage();
      }
    });
  }

  onSelectModelo() {
    this.clearAnos();
    this.carService.getAnos(this.tipoValue, this.marcaValue, this.modeloValue).subscribe({
      next: data => {
        this.anosDeVeiculo = data;
      },
      error: err => {
        this.showErrorMessage();
      }
    });
  }

  //ao submeter o form, recupera os valores do veículo em questão e atualiza as informações para o componente de exibição dos resultados
  onFormSubmit() {
    this.carForm.markAllAsTouched();
    if(this.carForm.valid){
      this.carService.getValor(this.tipoValue, this.marcaValue, this.modeloValue, this.anoValue).subscribe({
        next: data => {
          this.carInfo = data;
          this.valorVeiculo = this.valorValue.replace(',', '.');
          this.submitted = true;
        },
        error: err => {
          this.showErrorMessage();
        }
      });
    }
  }

  //funcoes responsáveis por limpar os campos dos próximos seletores quando o valor do seletor atual é mudado
  clearMarcas() {
    this.carForm.get("marca")?.reset();
    this.marcasDeVeiculo = [];
    this.clearModelos(); 
  }

  clearModelos() {
    this.carForm.get("modelo")?.reset();
    this.modelosDeVeiculo = [];
    this.clearAnos();
  }

  clearAnos() {
    this.carForm.get("ano")?.reset();
    this.anosDeVeiculo = [];
  }

  //mostra um aviso flutuante ao receber um erro do controlador
  showErrorMessage() {
    this.snackBar.open('Falha ao se conectar ao servidor','Fechar', {
      duration: 10000,
    });
  }

}
