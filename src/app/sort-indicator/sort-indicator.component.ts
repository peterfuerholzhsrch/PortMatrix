import { Component } from '@angular/core';

@Component({
  selector: 'sort-indicator',
  template: '<span class="{{getArrowClass()}}"></span><span class="{{getSortOrderClass()}}"></span>',
  styleUrls: ['./sort-indicator.component.scss'],
  inputs: ['ascending', 'order' ]
})
export class SortIndicator {
  public ascending: string;
  public order: string;

  constructor() { }

  public getArrowClass(): string {
    if (this.ascending) {
      return this.ascending == "true" ? "arrow-up" : "arrow-down";
    }
    return "";
  }

  public getSortOrderClass(): string {
    if (this.order && Number(this.order) >= 0) {
      return "sort" + (Number(this.order) + 1);
    }
    return "";
  }
}
