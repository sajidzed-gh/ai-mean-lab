import { Component, Input, SimpleChanges } from '@angular/core';
import user from '../../shared/entity/user';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  @Input() user!: user;
  i: number = 0;

  constructor() {
    console.log('constructor (once)', ++this.i);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges (if input reference changed)', ++this.i, changes);
  }

  ngOnInit(options?: any) {
    console.log('ngOnInit (once)', ++this.i, options);
  }

  ngDoCheck(options?: any) {
    console.log('ngDoCheck (on every change detection cycle)', ++this.i, options);
  }

  ngAfterContentInit(options?: any) {
    console.log('ngAfterContentInit (once)', ++this.i, options);
  }

  ngAfterContentChecked(options?: any) {
    console.log('ngAfterContentChecked (on every change detection cycle)', ++this.i, options);
  }

  ngAfterViewInit(options?: any) {
    console.log('ngAfterViewInit (once)', ++this.i, options);
  }

  ngAfterViewChecked(options?: any) {
    console.log('ngAfterViewChecked (on every change detection cycle)', ++this.i, options);
    this.i = 0; // Reset the counter after all checks to avoid overflow in long-running applications
  }

  ngOnDestroy(options?: any) {
    console.log('ngOnDestroy called', ++this.i, options);
  }
}
