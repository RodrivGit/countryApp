import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  constructor(private cservice: CountriesService){}

  public countries: Country[] = [];
  

  searchByRegion(term:string) :void {
    console.log('desde ByRegionPage')
    console.log({term})
    this.cservice.searchByRegion(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
