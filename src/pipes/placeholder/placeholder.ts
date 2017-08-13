import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PlaceholderPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, bydefault: string = 'Titulo') {
    return ( value ) ? value : bydefault;
  }
}
