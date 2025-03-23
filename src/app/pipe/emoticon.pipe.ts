import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoticon'
})
export class EmoticonPipe implements PipeTransform {

  transform(value: string): unknown {
    value = value + ":D"; 
    return value;
  }

}
