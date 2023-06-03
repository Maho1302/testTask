import {Component, OnInit, Output} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  USD = 0;
  EUR = 0;


  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService
      .getRates('UAH')
      .subscribe((currencyService) => {
        this.USD = currencyService.rates['USD']
        this.EUR = currencyService.rates['EUR']
      });
  }

}
