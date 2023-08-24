import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{
  constructor(private cservice: CountriesService){}
  
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  ngOnInit(): void {
    this.countries = this.cservice.cacheStore.byCapital.countries;
    this.initialValue = this.cservice.cacheStore.byCapital.term;
  }

  

  searchByCapital(term:string) :void {
    this.isLoading = true;
    console.log('desde ByCapitalPage')
    console.log(this.isLoading)
    console.log({term})
    this.cservice.searchByCapital(term)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    })
  }

}
