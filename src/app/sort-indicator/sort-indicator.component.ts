import { Component } from '@angular/core';

@Component({
  selector: 'sort-indicator',
  template: `<span class="sort-indicator">
               <span class="glyphicon {{getArrowClass()}}" aria-hidden="true"></span>
               <span class="number">{{getSortOrder()}}</span>
             </span>`,
  styleUrls: ['./sort-indicator.component.scss'],
  inputs: ['ascending', 'order' ]
})
export class SortIndicator {
  ascending: string;
  order: string;

  constructor() { }

  getArrowClass(): string {
    if (this.ascending) {
      return this.ascending == "true" ? "glyphicon-menu-down" : "glyphicon-menu-up";
    }
    return "";
  }

  getSortOrder(): string {
    if (this.order && Number(this.order) >= 0) {
      return String((Number(this.order) + 1));
    }
    return "";
  }
}
