import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRates} from "../interfaces/irates";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getRates(base:string): Observable<IRates> {
    return this.httpClient.get<IRates>(`https://api.exchangerate.host/latest?base=${base}`)
  }

}
