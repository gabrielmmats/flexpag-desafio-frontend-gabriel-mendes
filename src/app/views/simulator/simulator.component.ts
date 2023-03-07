import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemCode } from 'src/app/core/models/item-code';
import { CarInfo } from 'src/app/core/models/car-info';

function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notANumber = isNaN((control.value).replace(',', '.'));
    return notANumber ? {nan: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit{

  //listas de valores dos selectors
  tiposDeVeiculo: ItemCode<string>[] = [];
  marcasDeVeiculo: ItemCode<string>[] = [];
  modelosDeVeiculo: ItemCode<string>[] = [];
  anosDeVeiculo: ItemCode<string>[] = [];

  //inputs do componente de informacao
  carInfo = {} as CarInfo;
  valorVeiculo = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private carService: CarService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tiposDeVeiculo = this.carService.getTipos();
  }
  
  carForm = this.formBuilder.group({
    tipo: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    ano: ['', [Validators.required]],
    valor: ['', [Validators.required, numberValidator()]]
  });

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

  showErrorMessage() {
    this.snackBar.open('Falha ao se conectar ao servidor','Fechar', {
      duration: 510000,
    });
  }

}
