import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiURL : string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  //method refactorization
  private getCountriesHttp(url:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      delay(2000)
    )

  }

  searchCountryByAlphaCode(code:string): Observable<Country | null>{
    const url = `${this.apiURL}/alpha/${code}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]:null),
      catchError(() => of(null))
    );
  }

  searchByCapital(term: string) : Observable<Country[]>{
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesHttp(url)
  }
  searchByCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesHttp(url);
   }


  searchByRegion(region : string) : Observable<Country[]>{
    const url = `${this.apiURL}/region/${region}`
    return this.getCountriesHttp(url);
  }
}
