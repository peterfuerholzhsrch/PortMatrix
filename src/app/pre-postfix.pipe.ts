import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prePostfix'
})
export class PrePostfixPipe implements PipeTransform {

  transform(value: any, prefix: string = "", postfix: string = ""): any {
    return value ? prefix + value + postfix : value;
  }

}
