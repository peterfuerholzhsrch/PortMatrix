import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


export interface AlertModel {
  title: string;
  message: string;
}

/**
 * Implements a modal alert dialog (= one close button).
 * See https://www.npmjs.com/package/ng2-bootstrap-modal
 */
@Component({
  selector: 'alertDialog',
  template: `<div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-header">
                   <button type="button" class="close" (click)="close()" >&times;</button>
                   <h4 class="modal-title">{{title || 'Alert'}}</h4>
                 </div>
                 <div class="modal-body">
                   <p [innerHTML]="message || 'OK'"></p>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-default" (click)="close()" >OK</button>
                 </div>
               </div>
             </div>`,
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent extends DialogComponent<AlertModel, null> {
  private title: string;
  private message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
