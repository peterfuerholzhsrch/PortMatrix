import {Log} from 'ng2-logger/ng2-logger'
import { Component, EventEmitter } from '@angular/core';
import { Sorting } from '../model/sorting';

@Component({
  selector: 'sort-button',
  template: `<button class="sort-btn btn btn-default" (click)="sortingButtonClicked(sorting.dbColumn)">{{sorting.text}}
              </button>
                <sort-indicator ascending="{{isAscending(sorting.dbColumn)}}" order="{{getOrder(sorting.dbColumn)}}">
                </sort-indicator>`,
  styleUrls: ['./sort-button.component.scss'],
  inputs: ['sorting', 'sortingList' ],
  outputs: ['sortingChanged']
})
export class SortButtonComponent {
  private log = Log.create('sort-button');
  sorting: Sorting;
  sortingList: Array<Sorting>;
  sortingChanged: EventEmitter<Array<Sorting>> = new EventEmitter<Array<Sorting>>();

  constructor() { }

  /**
   * To be called by a sorting button
   * @param sortButton
   */
  sortingButtonClicked(sortButton : string) {
    const sorting = this.getSorting(sortButton);
    if (sorting) {
      sorting.ascending = !sorting.ascending;
    }
    else {
      const addSorting = Sorting.getSortingByDbColumn(sortButton);
      if (!addSorting) {
        this.log.w("Unknown sorting! sortButton=", sortButton);
        return;
      }
      this.sortingList.push(addSorting);
    }
    this.sortingChanged.next(this.sortingList);
  }

  isAscending(sortButton: string): Boolean {
    const sorting = this.getSorting(sortButton);
    return sorting ? sorting.ascending : null;
  }

  getOrder(sortButton: string): Number {
    const sortIndex = Sorting.getSortingIndexByDbColumn(this.sortingList, sortButton);
    return sortIndex >= 0 ? sortIndex : null;
  }

  private getSorting(sortButton: string): Sorting {
    const sortIndex = Sorting.getSortingIndexByDbColumn(this.sortingList, sortButton);
    if (sortIndex >= 0) {
      return this.sortingList[sortIndex];
    }
    return null;
  }
}
