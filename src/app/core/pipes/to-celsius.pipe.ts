import { Pipe, PipeTransform } from '@angular/core';

export type TemperatureFormatType = 'long' | 'short';

@Pipe({ name: 'toCelsiusEntity' })
export class ToCelciusTagConverterPipe implements PipeTransform {
    transform(value?: number): string | undefined {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = `${value ?? '-'} &#176;`;
        return tempElement.innerText;
    }
}
