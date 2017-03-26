import { Component } from '@angular/core';


/**
 * Small component to show network switching's test state as icon and tool tip.
 */
@Component({
  selector: 'test-status',
  template: `<span class="glyphicon glyphicon-ok"
                   aria-hidden="true"
                   title="OK"
                   *ngIf="result == true"></span>
             <span class="glyphicon glyphicon-flash"
                   aria-hidden="true"
                   title="NOK"
                   *ngIf="result == false"></span>
             <span title="NA"
                   *ngIf="result !== false && result !== true">n/a</span>
 `,
  styleUrls: ['./test-status.component.scss'],
  inputs: ['result']  // if null "NA" is shown in UI
})
export class TestStatusComponent {
  result: Boolean;

  constructor() {
  }
}
