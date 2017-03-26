import { Pipe, PipeTransform } from '@angular/core';


/**
 * This pipe allows to add a pre- and postfix to a (stringifiec) value. If the value is falsy the pre-/postfix will be
 * omitted.
 */
@Pipe({
  name: 'prePostfix'
})
export class PrePostfixPipe implements PipeTransform {

  transform(value: any, prefix: string = "", postfix: string = ""): any {
    return value ? prefix + value + postfix : value;
  }
}
