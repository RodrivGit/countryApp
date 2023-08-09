import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  constructor(private cservice: CountriesService){}

  public countries: Country[] = [];
  

  searchByCapital(term:string) :void {
    console.log('desde ByCapitalPage')
    console.log({term})
    this.cservice.searchByCapital(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
