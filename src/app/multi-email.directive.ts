import { Directive, forwardRef, Attribute } from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {validateConfig} from "@angular/router/src/config";


/**
 * Custom validator to check that an input/textarea contains one or more email addresses.
 * Accepted delimiters: white spaces (line termination, space, tab)
 *
 * Based on: https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
 */
@Directive({
  selector: '[multiEmail][formControlName],[multiEmail][formControl],[multiEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MultiEmailDirective), multi: true }
  ],
  exportAs: 'multiEmailExp'
})
export class MultiEmailDirective implements Validator {

  constructor(@Attribute('multiEmail') public multiEmail: string) { }

  validate(c: AbstractControl): { [key: string]: any } {
    let multiEmail = c.value;
    return MultiEmailDirective.getEmailList(multiEmail) ? null/*OK*/ : {multiEmail: true}/*Error*/;
  }


  /**
   * @param multiEmail
   * @returns {any} null = multiEmail contains invalid content
   */
  public static getEmailList(multiEmail: String): Array<String> {
    const emails = [];
    if (!multiEmail) {
      return emails;
    }
    const tokens = multiEmail.split(/\s/); // \s = white space
    for (var token of tokens) {
      if (token) {
        if (MultiEmailDirective.validateEmail(token)) {
          emails.push(token);
        }
        else {
          return null;
        }
      }
    }
    return emails;
  }


  /**
   * Taken from https://www.hacksparrow.com/javascript-email-validation.html
   * @param email
   * @returns {boolean}
   */
  private static validateEmail(email: string) {
    // First check if any value was actually set
    if (email.length == 0) return false;
    // Now validate the email format using Regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
  }
}
