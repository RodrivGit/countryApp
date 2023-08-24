import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store-interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiURL : string = 'https://restcountries.com/v3.1'

  public cacheStore:CacheStore = {
    byCapital:   {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion:    {region: '', countries: []}
  }

  constructor(private httpClient: HttpClient) { 
    console.log('Countries Services Init')
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheZtore',JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheZtore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheZtore')!)
  }

  //method refactorization
  private getCountriesHttp(url:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      // delay(2000)
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
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term,countries}),
      tap( ()=> this.saveToLocalStorage())
    )
  }
  searchByCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesHttp(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term,countries}),
      tap( ()=> this.saveToLocalStorage())
    )
   }


  searchByRegion(region : Region) : Observable<Country[]>{
    const url = `${this.apiURL}/region/${region}`
    return this.getCountriesHttp(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region,countries}),
      tap( ()=> this.saveToLocalStorage())
    )
  }
}
