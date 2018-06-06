import { Pipe, PipeTransform } from '@angular/core';
import { SERVICE_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'users'): any {
    let url = SERVICE_URL + '/img';

    if (!image ) {
        url += `/${type}/no-image`;
    } else {
        if (image.indexOf('https') !== -1) {
          url = image;
        } else {
          url += `/${type}/${image}`;
        }
    }

    return url;
  }

}
