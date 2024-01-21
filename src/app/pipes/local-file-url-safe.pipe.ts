import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe',
    standalone: true,
})
export class LocalFileUrlSafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
