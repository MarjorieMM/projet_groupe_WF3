import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euroTransform' })
export class EuroTransformPipe {
  transform(price: number) {
    price = price / 100;
    return price;
  }
}
