import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startsWithCapital'
})
export class StartsWithCapitalPipe implements PipeTransform {
  transform(headerName: string): string {
    return headerName.charAt(0).toUpperCase() + headerName.slice(1);
  }
}
