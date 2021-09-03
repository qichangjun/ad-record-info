import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({ selector: '[scrollBoxBtn]' })
export class scrollBoxBtn implements OnInit {
    /**
     * 滚动的容器元素el
     */
    @Input() containerEl : any
    /**
     * 滚动方向
     */
    @Input() direction : 'left' | 'right'
    timer = null;
    /**
     * 每次移动多少像素
     */
    size : number = 5;
    @HostListener('mousedown') mousedown() {
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            var sleft = this.containerEl.scrollLeft;
            var swidth = this.containerEl.scrollWidth;
            var width = this.containerEl.offsetWidth;
            if (this.direction == 'left'){
                var to : number = (sleft - this.size) >= (swidth - width) ? (swidth - width) : (sleft - this.size);    
            }else if (this.direction == 'right'){
                var to : number = (sleft + this.size) >= (swidth - width) ? (swidth - width) : (sleft + this.size);    
            }else{
                console.warn('没有指定direction')
                return 
            }            
            this.fn(to);
        },15)
    }

    @HostListener('mouseleave') mouseleave(){
        clearInterval(this.timer);
    }

    @HostListener('mouseup') mouseup() {
        clearInterval(this.timer);
    }
    constructor(
        private el: ElementRef) { }
    ngOnInit() {
    }

    fn (to:number) {
        this.containerEl.scrollLeft = to
    }
}
