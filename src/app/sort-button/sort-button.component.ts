import { Component, EventEmitter } from '@angular/core';
import { Sorting } from '../model/Sorting';

@Component({
  selector: 'sort-button',
  template: `<button class="sort-btn btn btn-default" (click)="sortingButtonClicked(sorting.dbColumn)">{{sorting.text}}
                <sort-indicator ascending="{{isAscending(sorting.dbColumn)}}" order="{{getOrder(sorting.dbColumn)}}">
                </sort-indicator>
              </button>`,
  styleUrls: ['./sort-button.component.scss'],
  inputs: ['sorting', 'sortingList' ],
  outputs: ['sortingChanged']
})
export class SortButtonComponent {
  public sorting: Sorting;
  public sortingList: Array<Sorting>;
  public sortingChanged: EventEmitter<Array<Sorting>> = new EventEmitter();

  constructor() { }

  /**
   * To be called by a sorting button
   * @param sortButton
   */
  public sortingButtonClicked(sortButton : string) {
    const sorting = this.getSorting(sortButton);
    if (sorting) {
      sorting.ascending = !sorting.ascending;
    }
    else {
      const addSorting = Sorting.getSortingByDbColumn(sortButton);
      if (!addSorting) {
        console.warn("Unknown sorting! sortButton=" + sortButton);
        return;
      }
      this.sortingList.push(addSorting);
    }
    this.sortingChanged.next(this.sortingList);
  }

  public isAscending(sortButton: string): Boolean {
    const sorting = this.getSorting(sortButton);
    return sorting ? sorting.ascending : null;
  }

  public getOrder(sortButton: string): Number {
    const sorting = Sorting.getSortingByDbColumn(sortButton);
    const sortIndex = this.sortingList.indexOf(sorting);
    return sortIndex >= 0 ? sortIndex : null;
  }

  private getSorting(sortButton: string): Sorting {
    const sorting = Sorting.getSortingByDbColumn(sortButton);
    const sortIndex = this.sortingList.indexOf(sorting);
    if (sortIndex >= 0) {
      return sorting;
    }
    return null;
  }
}
