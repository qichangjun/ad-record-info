import { Directive, ElementRef, Input } from '@angular/core';
import { Inject } from '@angular/core';

@Directive({ 
    selector: '[imgError]'
 })

export class AdImageError {
    @Input() imgError: string;
    private index: number = 0
    constructor(
        private el: ElementRef,
        @Inject('assetsUrl') private assetsUrl
    ) {                
        this.el.nativeElement.onerror = () => {
            this.index++
            if (this.imgError) {
                this.el.nativeElement.src = assetsUrl + this.imgError
            } else {
                this.el.nativeElement.src = assetsUrl + '/assets/images/icon/unknown.svg'
            }
            if (this.index >= 10) {
                this.el.nativeElement.onerror = null
            }
        }
    }
}