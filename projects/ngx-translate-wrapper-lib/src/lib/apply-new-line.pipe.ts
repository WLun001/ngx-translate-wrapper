import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyNewLine'
})
export class ApplyNewLinePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    // replace end line/new line characters with <br> and <p>
    return value ?
      '<p>' + value.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '</p><p>')
        .replace(/(?:\r\n|\r|\n)/g, '<br>') + '</p>'
      : value;
  }

}
