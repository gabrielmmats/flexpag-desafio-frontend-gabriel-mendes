import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ItemCode } from 'src/app/core/models/item-code';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit{

  tiposDeVeiculo: ItemCode<string>[] = [];
  marcasDeVeiculo: ItemCode<string>[] = [];

  constructor(private formBuilder: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.tiposDeVeiculo = this.carService.getTipos();
  }
  
  carForm = this.formBuilder.group({
    tipo: [null],
    marca: [null]
  })

  onSelectTipo(ob: MatSelectChange) {
    this.carService.getMarcas(ob.value.codigo).subscribe(data => {
      this.marcasDeVeiculo = data;
    });
  }

  onSelectMarca(ob: MatSelectChange) {

  }

  onFormSubmit() {
    console.log(this.carForm.value);
    this.resetForm();
  }

  resetForm() {
    this.marcasDeVeiculo = [];
    this.carForm.reset();
  }

}
