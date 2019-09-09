import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemCount'
})
export class ItemCountPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }

  transform(imageCount: number): string {
    if(imageCount > 100 && imageCount < 500){
      return '100+';
    }else if(imageCount > 500 && imageCount < 1000){
      return '500+';
    }else if(imageCount > 1000){
      return '1000+';
    }
  }

}
