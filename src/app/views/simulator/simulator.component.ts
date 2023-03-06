import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';
import { FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ItemCode } from 'src/app/core/models/item-code';
import { CarInfo } from 'src/app/core/models/car-info';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit{

  tiposDeVeiculo: ItemCode<string>[] = [];
  marcasDeVeiculo: ItemCode<string>[] = [];
  modelosDeVeiculo: ItemCode<bigint>[] = [];
  anosDeVeiculo: ItemCode<string>[] = [];
  carInfo = {} as CarInfo;
  valorVeiculo = '';

  constructor(private formBuilder: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.tiposDeVeiculo = this.carService.getTipos();
  }
  
  carForm = this.formBuilder.group({
    tipo: [{nome: '', codigo: ''}],
    marca: [{nome: '', codigo: ''}],
    modelo: [{nome: '', codigo: 0n}],
    ano: [{nome: '', codigo: ''}],
    valor: ['']
  });

  get tipo() { 
    return this.carForm.value.tipo?.codigo || '';
  }

  get marca() { 
    return this.carForm.value.marca?.codigo || '';
  }

  get modelo() {
    return this.carForm.value.modelo?.codigo || 0n;
  }

  get ano() {
    return this.carForm.value.ano?.codigo || '';
  }

  get valor() {
    return this.carForm.value.valor || '';
  }

  onSelectTipo(ob: MatSelectChange) {
    this.clearMarcas();
    this.carService.getMarcas(ob.value.codigo).subscribe(data => {
      this.marcasDeVeiculo = data;
    });    
  }

  onSelectMarca(ob: MatSelectChange) {
    this.clearModelos();
    this.carService.getModelos(this.tipo, ob.value.codigo).subscribe(data => {
      this.modelosDeVeiculo = data;
    });    
  }

  onSelectModelo(ob: MatSelectChange) {
    this.clearAnos();
    this.carService.getAnos(this.tipo, this.marca, ob.value.codigo).subscribe(data => {
      this.anosDeVeiculo = data;
    });
  }

  onFormSubmit() {
    this.carService.getValor(this.tipo, this.marca, this.modelo, this.ano).subscribe(data => {
      this.carInfo = data;
      this.valorVeiculo = this.valor;
    });
  }

  resetForm() {
    this.clearMarcas();
    this.carForm.reset();
  }

  clearMarcas() {
    this.marcasDeVeiculo = [];
    this.clearModelos();
  }

  clearModelos() {
    this.modelosDeVeiculo = [];
    this.clearAnos();
  }

  clearAnos() {
    this.anosDeVeiculo = [];
  }

}
