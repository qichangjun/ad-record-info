import { style } from '@angular/animations';
import { Directive, ElementRef, Input, HostListener, OnInit, OnChanges, SimpleChange } from '@angular/core';
import * as _ from 'lodash';
import { TileOptions } from './recordTile.class';
@Directive({ selector: '[formValidPass]' })
export class FormValidPassDirective implements OnInit, OnChanges {
    @Input() validPass: boolean;
    @Input() formValidOption: TileOptions
    @Input() formValue: any
    @Input() scene : string
    validErrorMessage = document.createElement("p");
    constructor(
        private el: ElementRef) { }
    ngOnInit() {
    }

    checkValid(value, option: TileOptions) {
        this.el.nativeElement.classList.remove('has-error-input')        
        if (option.scene.indexOf(this.scene) != -1 || !this.scene || !option.scene){            
            if (!value && option.isRequired == 'true') {                              
                this.el.nativeElement.classList.add('has-error-input')                
                this.el.nativeElement.placeholder = '必填'                                
            }else if (option.valueType  == 'int' && !(_.isNumber(value*1))){
                this.el.nativeElement.classList.add('has-error-input')
                this.el.nativeElement.placeholder = '必须为整数'
            }else if (option.contentType == 'input-number' && !(/^([0-9]{1,3}|999)$/.test(value))){                
                this.el.nativeElement.classList.add('has-error-input')
                this.el.nativeElement.placeholder = '必须为0-999的整数'
            }
        }  
    }


    // checkValid(value, option: TileOptions) {
    //     this.validErrorMessage.remove()
    //     this.validErrorMessage.classList.add('validMessage') 
    //     if (option.scene.indexOf(this.scene) != -1 || !this.scene || !option.scene){            
    //         if (!value && option.isRequired == 'true') {
    //             if(this.validErrorMessage.innerText!='不能为空'){
    //                 this.validErrorMessage.innerText = '不能为空'
    //             }
    //             this.el.nativeElement.parentNode.append(this.validErrorMessage)    
    //         }else if (option.valueType  == 'int' && !(_.isNumber(value*1))){
    //             if(this.validErrorMessage.innerText!='必须为数字型'){
    //                 this.validErrorMessage.innerText = '必须为数字型'
    //             }
    //             this.el.nativeElement.parentNode.append(this.validErrorMessage)
    //         }else if (option.contentType == 'input-number' && !(/^([0-9]{1,3}|999)$/.test(value))){                
    //             if(this.validErrorMessage.innerText!='必须为0-999的整数数字'){
    //                 this.validErrorMessage.innerText = '必须为0-999的整数数字'
    //             }
    //             this.el.nativeElement.parentNode.append(this.validErrorMessage)
    //         }
    //     }  
    // }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (!this.validPass) {            
            this.checkValid(this.formValue, this.formValidOption)
        }else{
            this.validErrorMessage.remove()
        }
    }
}
