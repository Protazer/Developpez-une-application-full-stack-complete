import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /**
   * Truncates a string to a specified length and appends a trail if truncated.
   * @param value The string to truncate
   * @param args Array where the first element is the limit (number), and second is the trailing string (optional)
   * @returns The truncated string with trail or original string if within limit
   */
  transform(value: string, args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
