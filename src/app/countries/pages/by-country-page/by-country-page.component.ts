import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  constructor(private cservice: CountriesService){}

  public countries: Country[] = [];
  

  searchByCountry(term:string) :void {
    console.log('desde ByCountryPage')
    console.log({term})
    this.cservice.searchByCountry(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
