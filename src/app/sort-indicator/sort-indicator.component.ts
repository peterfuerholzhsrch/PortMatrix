import { Component } from '@angular/core';

@Component({
  selector: 'sort-indicator',
  template: '<span class="sort-indicator"><span class="glyphicon {{getArrowClass()}}"></span><span class="number">{{getSortOrder()}}</span></span>',
  styleUrls: ['./sort-indicator.component.scss'],
  inputs: ['ascending', 'order' ]
})
export class SortIndicator {
  public ascending: string;
  public order: string;

  constructor() { }

  public getArrowClass(): string {
    if (this.ascending) {
      return this.ascending == "true" ? "glyphicon-menu-down" : "glyphicon-menu-up";
    }
    return "";
  }

  public getSortOrder(): string {
    if (this.order && Number(this.order) >= 0) {
      return String((Number(this.order) + 1));
    }
    return "";
  }


}
