import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{
  constructor(private cservice: CountriesService){}

  public countries: Country[] = [];
  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.cservice.cacheStore.byCountries.countries;
    this.initialValue = this.cservice.cacheStore.byCountries.term;
  }
  

  searchByCountry(term:string) :void {
    console.log('desde ByCountryPage')
    console.log({term})
    this.cservice.searchByCountry(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
