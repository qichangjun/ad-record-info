import { Directive, ElementRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
@Directive({ selector: '[imgError]' })

export class ImageError {
    @Input() imgError: any;
    private index: number = 0
    constructor(private el: ElementRef) {
        if(!environment.assetsUrl){
            console.error('没有配置assetsUrl路径，请检查environment文件')
            return 
        }
        this.el.nativeElement.onerror = () => {
            this.index++
            if (this.imgError) {
                this.el.nativeElement.src = environment.assetsUrl + this.imgError
            } else {
                this.el.nativeElement.src = environment.assetsUrl + '/assets/images/icon/unknown.svg'
            }
            if (this.index >= 10) {
                this.el.nativeElement.onerror = null
            }
        }
    }
}