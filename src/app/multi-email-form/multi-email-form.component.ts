import {Log} from 'ng2-logger/ng2-logger'
import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MultiEmailDirective} from "../multi-email.directive";
import {Subscription} from "rxjs";


/**
 * This component realizes a widget where the user can enter multiple email addresses in a HTML textarea. The email
 * addresses get checked via Regex (MultiEmailDirective) and must be white space separated.
 */
@Component({
  selector: 'multi-email-form',
  templateUrl: './multi-email-form.component.html',
  exportAs: 'ngModel',
  outputs: ['inputValid']
})
export class MultiEmailFormComponent implements OnInit {
  private log = Log.create('multi-email-form');

  private multiEmailForm: NgForm;

  @ViewChild('multiEmailForm') currentForm: NgForm;

  private multiEmailValid: boolean;
  private multiemailSubscription: Subscription;

  private inputValid: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  /**
   * lifecycle hook
   */
  ngOnInit() {
    // nothing
  }


  /**
   * lifecycle hook
   */
  ngAfterViewChecked() {
    if (this.currentForm === this.multiEmailForm) {
      return;
    }
    this.multiEmailForm = this.currentForm;
    if (this.multiEmailForm) {
      this.multiemailSubscription = this.multiEmailForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }


  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    if (this.multiemailSubscription) {
      this.multiemailSubscription.unsubscribe();
    }
  }


  private onValueChanged(data?: any) {
    if (!this.multiEmailForm) {
      return;
    }
    this.log.d('onValueChanged: ', JSON.stringify(data), "  valid=", this.multiEmailForm.valid);

    if (this.multiEmailValid !== this.multiEmailForm.valid) {
      // valid flag has changed:
      this.multiEmailValid = this.multiEmailForm.valid;
      this.inputValid.next(this.multiEmailValid);
    }
  }


  isMultiEmailValid() {
    return this.multiEmailValid;
  }


  /**
   * @returns {Array} empty array of emails if empty or invalid
   */
  getEmailAddresses(): Array<String> {
    if (!this.isMultiEmailValid()) {
      return [];
    }
    return MultiEmailDirective.getEmailList(this.multiEmailForm.value.emails);
  }
}
