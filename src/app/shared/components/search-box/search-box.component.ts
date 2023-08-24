import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  
  @Input () public placeholder: string = '' //In case no placeholder sen
  @Input () public initialValue: string = 'ss' //In case no placeholder sen
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();
  // @ViewChild('txtSearchInput') txtInput!: ElementRef;
  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(debounceTime(400))
    .subscribe(value =>{
      this.onDebounce.emit(value)
    })
  }
  
  public emitValue(txt : string){
    this.onValue.emit(txt)
  }
  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    console.log("Componente destruido: ",this.placeholder)
    this.debouncerSuscription?.unsubscribe();
  }
}
