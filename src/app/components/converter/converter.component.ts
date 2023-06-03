import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencyArr = ["UAH", "USD", "EUR" ]
  second:number
  first:number
  from = "USD"
  to = "UAH"
  usd:number
  eur:number
  usdRate ="USD"
  eurRate = "EUR"
  rates: {[key : string]: number} = {}
  ratesTo:{[key : string]: number} = {}
  ratesUSD: {[key : string]: number} = {}
  ratesToEUR: {[key : string]: number} = {}
  fromInputControl : FormControl
  toInputControl: FormControl
  fromSelectFormControl: FormControl
  toSelectFormControl:FormControl
  fromToChange:boolean = true

  loadRates(first:boolean){
    this.currencyService.getRates(this.to).subscribe((value)=> this.ratesTo = value.rates)
    this.currencyService.getRates(this.from).subscribe((value) => this.rates = value.rates)
  }

  constructor(private currencyService:CurrencyService) { }

  ngOnInit(): void {
    this.loadRates(true);
    this.loadRates(false)
    this.fromInputControl = new FormControl()
    this.toInputControl =  new FormControl()
    this.fromSelectFormControl = new FormControl("USD")
    this.toSelectFormControl = new FormControl("UAH")
    this.currencyService.getRates(this.usdRate).subscribe((value) => this.ratesUSD = value.rates)
    this.currencyService.getRates(this.eurRate).subscribe((value) => this.ratesToEUR = value.rates)


    this.fromSelectFormControl.valueChanges.subscribe((value) => {
      this.from = value
      this.fromInputControl.setValue(parseFloat((this.fromInputControl.value * this.rates[this.from]).toFixed(2)))
    } )

    this.toSelectFormControl.valueChanges.subscribe((value) => {
      this.to = value
      this.toInputControl.setValue(parseFloat((this.fromInputControl.value * this.rates[this.to]).toFixed(2)))
    } )

    this.fromInputControl.valueChanges.subscribe((value) => {
      if(this.fromToChange){
        this.toInputControl.setValue(parseFloat((value * this.rates[this.to]).toFixed(2)))
      }
    })

    this.toInputControl.valueChanges.subscribe((value) => {
      if(this.fromToChange == false){
        this.fromInputControl.setValue(parseFloat((value / this.rates[this.to]).toFixed(2)))
      }
    })
  }

  changeFromToDirection(direction:boolean){
    this.fromToChange = direction;
  }

  // swapHandler() {
  //   const tempAmount = this.fromInputControl
  //   const tempCurrency = this.fromSelectFormControl
  //   this.fromInputControl = this.toInputControl
  //   this.fromSelectFormControl = this.toSelectFormControl
  //   this.toInputControl = tempAmount
  //   this.toSelectFormControl = tempCurrency
  // }

}
