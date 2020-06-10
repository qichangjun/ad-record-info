/* isExport : NO , type : FORM CONTROLS
/*                      $$$ recordinfo表单著录中的选择门类弹出框中的组件 $$$
/***********************************************************************************************
 ***             C O N F I D E N T I A L  ---  A M B E R D A T A                             ***
 ***********************************************************************************************
 *                                                                                             *
 *                 Project Name : 电子文件著录系统                                                    *
 *                                                                                             *
 *                    File Name : choose-class-modulecomponent.ts                              *
 *                                                                                             *
 *                   Programmer : qichangjun                                                   *
 *                                                                                             *
 *                   Start Date : 6月1日, 2020                                                      *
 *                                                                                             *
 *                  Last Update : 6月10日 下午13:46,2020                                             *
 *                               Determines                                                    *
 *---------------------------------------------------------------------------------------------*
 *  Functions:                                                                                 *
 *   openFolder -- 双击节点事件，更新节点的展开状态                                                    * 
 *   activeNode -- 点击选中节点事件，(只有type为file_type类型的根节点可以选中)                           *
 *   changePolicy -- 切换文件策略事件.                                                            *
 *   setToDefaultPolicy -- 将当前文件策略切换至默认上传.                                            *
 *   getPolicyInfo -- 获取文件策略集合.                                                           *
 *   uploadFinish -- 文件上传完成后的callback.                                                    *
 *   saveFileInfo -- 将上传文件后的文件策略json保存进整体record的json中.                                 *
 *   deleteFile -- 删除文件.                                                                     *
 *   previewDoc -- 预览文件.                                                                     *
 *   formatPoolicyInfo --  将policy的json格式化成recordinfo的json中需要的格式.                      *
 *   findBlockByNameAndLevel -- 根据block的名称和层级找到指定的block对象                                *
 *   findFileType -- 根据key找到文件资料节点.                                                      *
 *   guid -- 生产随机的key.                                                                          *
 *   formatServicePolicyInfo -- 将children转换成block                                            *
 *   getWholePath -- 获取从当前file-type节点到根路径的path                                             *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import { Component, forwardRef, Input, ViewChild,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { NzFormatEmitEvent,NzTreeNodeOptions } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd';
import {
    debounceTime, distinctUntilChanged, switchMap
  } from 'rxjs/operators';
export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => chooseClassModuleContentComponent),
    multi: true
};
@Component({
    selector: 'choose-class-module',
    templateUrl: './choose-class-module.component.html',
    styleUrls: ['./choose-class-module.component.scss'],
    providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class chooseClassModuleContentComponent implements ControlValueAccessor ,OnInit,OnChanges{
    @ViewChild('nzTreeSelect') nzTreeSelect: any;
    loading: boolean = false;
    classList: Array<any> = [];
    selectedItem: any = {}
    @Input() dwClassManageServiceGetMetaSysClassList : (id:string)=> Promise<any>
    @Input() _parentInfo: any = [];    
    constructor(
        private notification: NzNotificationService,
    ) {
    }

    ngOnInit(){
        
    }
    get parentInfo() {
        return this._parentInfo;
    }

    set parentInfo(value: any) {
        this._parentInfo = value;
        this.propagateChange(this._parentInfo);
    }

    propagateChange = (_: any) => { };

    writeValue(value: any) {
        if (value !== undefined) {
            this.parentInfo = value;
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }


    async onExpandChange(e: Required<NzFormatEmitEvent>){
        const node = e.node;        
        if (node && node.getChildren().length === 0 && node.isExpanded) {
            let res = await this.dwClassManageServiceGetMetaSysClassList(node.key)
            let children = res.map(c=>{
                return {
                    key : c.id,
                    children : [],
                    value : c,
                    isLeaf:c.bottom,
                    disabled : !c.bottom,
                    title : c.objectName
                }
            })        
            node.addChildren(children);
        }
    }

    async getClassList() {        
        let res = await this.dwClassManageServiceGetMetaSysClassList('0')
        this.classList = res.map(c=>{
            return {
                key : c.id,
                children : [],
                isLeaf:c.bottom,
                value : c,
                title : c.objectName,
                disabled : !c.bottom
            }
        })  
        this.nzTreeSelect.nzTreeClick.pipe(debounceTime(500)).subscribe(($event)=>{                           
            if (!$event.node.isLeaf){
                this.notification.blank(
                    '请选择下一级门类',
                    ''
                  );
                // this._ResponseHandleService.showMessage('')
            }
        })
    }

    changeSelect(e){
        this.parentInfo = e
    }

    ngOnChanges(changes: SimpleChanges){        
        if (changes['dwClassManageServiceGetMetaSysClassList'] && this.dwClassManageServiceGetMetaSysClassList){
            this.getClassList()
        }          
    }
}



