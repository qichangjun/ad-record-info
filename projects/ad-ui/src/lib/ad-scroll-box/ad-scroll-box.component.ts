import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, TemplateRef } from '@angular/core';
  
  @Component({
    selector: 'ad-scroll-box',
    templateUrl: './ad-scroll-box.component.html',
    styleUrls: ['./ad-scroll-box.component.scss']
  })
  export class AdScrollBoxComponent implements OnInit,OnChanges {   
    /**
     * 绑定的集合数据 */ 
    @Input() datas : any[] = []
    /**
     * 自定义显示模版
     */
    @Input() scrollBoxTemplateDiy?: TemplateRef<{ $implicit: any}>;  
    /**
     * 点击box事件
     */
    @Output() clickBoxEvent: EventEmitter<any> = new EventEmitter();
    constructor(
    ){}
    ngOnInit(): void {
    
    }

    clickBox(row:any){
      this.clickBoxEvent.emit(row)
    }
  
  
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }){
     
    }
  }
  