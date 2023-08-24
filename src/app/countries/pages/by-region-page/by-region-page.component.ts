import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  constructor(private cservice: CountriesService){}

  ngOnInit(): void {
    this.countries = this.cservice.cacheStore.byRegion.countries;
    this.selectedRegion = this.cservice.cacheStore.byRegion.region;
  }

  public countries: Country[] = [];
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?: Region;

  searchByRegion(region :Region) :void {
    this.selectedRegion = region;
    console.log('desde ByRegionPage')
    console.log({region})
    this.cservice.searchByRegion(region)
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
