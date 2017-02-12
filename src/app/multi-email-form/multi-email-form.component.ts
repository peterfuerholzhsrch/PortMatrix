import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MultiEmailDirective} from "../multi-email.directive";

@Component({
  selector: 'multi-email-form',
  templateUrl: './multi-email-form.component.html',
  exportAs: 'ngModel',
  outputs: ['inputValid']
})
export class MultiEmailFormComponent implements OnInit {

  private multiEmailForm: NgForm;

  @ViewChild('multiEmailForm') currentForm: NgForm;

  private multiEmailValid: boolean;

  private inputValid: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
    // nothing
  }


  ngAfterViewChecked() {
    if (this.currentForm === this.multiEmailForm) {
      return;
    }
    this.multiEmailForm = this.currentForm;
    if (this.multiEmailForm) {
      this.multiEmailForm.valueChanges.subscribe(data => this.onValueChanged(data))
    }
  }


  private onValueChanged(data?: any) {
    if (!this.multiEmailForm) {
      return;
    }
    // console.log('onValueChanged: ' + JSON.stringify(data) + "  valid=" + this.multiEmailForm.valid);

    if (this.multiEmailValid !== this.multiEmailForm.valid) {
      // valid flag has changed:
      this.multiEmailValid = this.multiEmailForm.valid;
      this.inputValid.next(this.multiEmailValid);
    }
  }


  public isMultiEmailValid() {
    return this.multiEmailValid;
  }


  /**
   * @returns {Array} empty array of emails if empty or invalid
   */
  public getEmailAddresses(): Array<String> {
    if (!this.isMultiEmailValid()) {
      return [];
    }
    return MultiEmailDirective.getEmailList(this.multiEmailForm.value.emails);
  }
}
