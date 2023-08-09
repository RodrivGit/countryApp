import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiURL : string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(code:string): Observable<Country[]>{
    const url = `${this.apiURL}/alpha/${code}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }

  searchByCapital(term: string) : Observable<Country[]>{
    const url = `${this.apiURL}/capital/${term}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }
  searchByCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiURL}/name/${term}`
    return this.httpClient.get<Country[]>(url)
  .pipe(
    catchError(() => of([]))
  )  }


  searchByRegion(region : string) : Observable<Country[]>{
    const url = `${this.apiURL}/region/${region}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of ([]))
    )
  }
}
