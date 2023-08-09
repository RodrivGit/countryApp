import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @Input () public placeholder: string = 'hola'
  @Output() EnterEvent = new EventEmitter<string>();
  // @ViewChild('txtSearchInput') txtInput!: ElementRef;

  public emitValue(txt : string){
    this.EnterEvent.emit(txt)
  }
}
