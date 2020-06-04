/**
 * 问题(1) 历史版本的文件策略如果被删除如何处理？现在是变成默认default情况，上传到电子文件的block下
 * 问题(2) 新上传的文件如何区分，使其不能预览
 * 问题(3) 用户切换文件策略时，是否要把之前上传的文件都删掉
 * 问题(4) 用户是否会在电子文件的block下再创建block,这样会导致使用文件策略生成的block把原来的电子文件下的block覆盖掉
 * 问题(5) 目前只支持record下有多个block的情况
 */

import { Component, forwardRef, Input, Output, ViewChild, OnInit, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { NzNotificationService } from 'ng-zorro-antd';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import * as _moment from 'moment';
const moment = _moment;
declare var JSONPath: any;
@Component({
    selector: 'add-electronic-document',
    templateUrl: './add-electronic-document.component.html',
    styleUrls: ['./add-electronic-document.component.scss'],
})
export class addElectronicDocumentComponent implements OnInit, OnChanges {
    activedNode: NzTreeNode;
    defaultFileLists : any[] = []
    policyInfo : any = []
    currentPolicy : any  = 'default'
    policyLists : any[] = []
    disableChangePolicy : boolean = false 
    fileJsonPath : string = ''
    @Input() id : string //record的id
    @Input() environmentBaseUrl : string
    @Input() objectPath : string 
    @Input() baseUrl : string 
    @Input() ApiUrl : any 
    @Input() AuthenticationService : any
    @Input() metadataSchemeId : string  
    @Input() jsonMetadataTemplate : any 
    @Input() getPolicyInfoPomise : (metadataId: string) => Promise<any>
    openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
      if (data instanceof NzTreeNode) {
        data.isExpanded = !data.isExpanded;
      } else {
        const node = data.node;
        if (node) {
          node.isExpanded = !node.isExpanded;
        }
      }
    }
  
    constructor() {}
    

    ngOnInit(){

    }
    activeNode(data: NzFormatEmitEvent): void {      
      if (data.node.origin.type == 'file_type'){
        this.activedNode = data.node!;
      }      
    }

    changePolicy(e){            
      let res  = this.policyLists.find(policy=>policy.policy.code == this.currentPolicy)
      if (res){
        let policyInfo = res          
        this.formatPoolicyInfo(policyInfo.policy,0,false)
        this.policyInfo = policyInfo.policy
      }else{
        this.setToDefaultPolicy()
      }   
    }

    setToDefaultPolicy(){
      this.currentPolicy = 'default'
      this.defaultFileLists = []
      this.policyInfo = {children:[]}
      let block = JSONPath.JSONPath({ path:this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })        
      if (block[0].value.file){
        this.defaultFileLists = block[0].value.file 
      }
    }

    async getPolicyInfo(){
      let policyInfo 
      this.policyLists = await this.getPolicyInfoPomise(this.metadataSchemeId)
      let block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })        
      //如果json里保存了文件策略     
      if (block[0] && block[0].value.policy){   
        this.disableChangePolicy = true      
        let policy_version = block[0].value.policy_version
        let policy_code = block[0].value.policy              
        let res  = this.policyLists.find(policy=>{          
          return policy.policy.code == policy_code && policy_version == policy.policy.version_no
        })
        if (res){
          policyInfo = res 
          this.currentPolicy = policyInfo.policy.code
          this.formatPoolicyInfo(policyInfo.policy,0,true)
          this.policyInfo = policyInfo.policy
        }else{
         this.setToDefaultPolicy()
        }        
      }
      //没有默认用传统上传方式
      else{
        this.setToDefaultPolicy()
      }
      
    }

    saveFileInfo(jsonMetadata){      
      let res = JSONPath.JSONPath({ path: this.fileJsonPath, json: jsonMetadata, resultType: 'all' })   
      if (!res) return 
      if (this.currentPolicy != 'default'){
        let clone_policyInfo = _.cloneDeep(this.policyInfo)
        this.formatServicePolicyInfo(clone_policyInfo)
        res[0].value.block = clone_policyInfo.block
        res[0].value.policy = this.policyInfo.code
        res[0].value.policy_version = this.policyInfo.version_no
        delete res[0].value.file 
        return 
      }
      res[0].value.file = this.defaultFileLists
      delete res[0].value.block 
      return 
    } 

    uploadFinish(e){      
      let file : any = {
        checksum_type : 'md5',
        size : e.size,
        name : e.name,
        checksum : e.data.md5,
        format : e.data.contentType,
        'creation_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
        'modify_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
        'url': 'local:' + e.data.storagePath,       
      }
      if (this.currentPolicy != 'default'){
        let fileType = this.findFileType()
        fileType.fileLists = fileType.fileLists ? _.castArray(fileType.fileLists) : []
        file.seq = fileType.fileLists.length + 1
        file.property = [
          {
            "name": "file_type",
            "title": "材料名称",
            "value": fileType.file_name
          }
        ]
        fileType.fileLists.push(file)
      }else{
        this.defaultFileLists.push(file)
      }      
    }

    deleteFile(i,key){
      let fileType = this.findFileType(key)
      fileType.fileLists.splice(i, 1)
    }

    async previewDoc(url) {
      if (!this.id){
        return 
      }
      let preview_window = window.open('')
      // let res = await this._RecordInfoService.getDocumentId(this.id, url)
      let objectId = this.objectPath + url
      objectId = objectId.replace(/\\/g, '/')        
      preview_window.location.href = `${this.environmentBaseUrl}previewDoc?objectId=${objectId}&recordId=${this.id}`
      // this.router.navigate(['/previewDoc'], { queryParams: { objectId: res } })
  }

    ngOnChanges(){
      if (this.metadataSchemeId && this.jsonMetadataTemplate){
        this.disableChangePolicy = false 
        if (!Array.isArray(this.jsonMetadataTemplate.record.block)){
          this.fileJsonPath = "$.record.block"
        }else{
          this.fileJsonPath = "$.record.block[?(@.name=='电子文件')]"
        }
        this.getPolicyInfo()              
      }
    }

//---------------------util方法------------
    //吧policy的json格式化成tree
    formatPoolicyInfo(info,level,needInitFile?){
      info.children = []
      if (info.category){
        info.category = info.category ? _.castArray(info.category) : []
        info.category.forEach(c=>{
          c.type='category'
          c.key = this.guid()
        })
        info.children = info.children.concat(info.category)
      }
      if (info.file_type){
        info.file_type = info.file_type ? _.castArray(info.file_type) : []
        info.file_type.forEach(c=>{
          c.type='file_type'
          c.isLeaf = true 
          c.key = this.guid()
          if (needInitFile){
            let fileLists = this.findBlockByNameAndLevel(info.name,level)
            if (fileLists){
              c.fileLists = fileLists
            }   
          }                 
        })
        info.children = info.children.concat(info.file_type)
      }
      info.children.forEach(child => {
        this.formatPoolicyInfo(child,level+1,needInitFile)
      });
    }

    //根据block名和层级寻找block        
    //吧json里的file集合取出来放进对应的policy的json里    
    //返回block的文件集合  
    findBlockByNameAndLevel(name,level){
      let block_entity
      let file_block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })        
      file_block = file_block[0].value
      if (!file_block) return false 
      let fn = (_file_block,self_level)=>{ 
        if (self_level == level && _file_block.name == name) {  
          block_entity = _file_block          
        }else{
          if (!_file_block.block) return 
          _file_block.block.forEach(c=>{
            return fn(c,self_level+1)
          })
        }        
      }
      fn(file_block,0)      
      return block_entity ? _.castArray(block_entity.file) : []
    }

    //根据key找到文件资料节点
    findFileType(key?){
      if (!key) key = this.activedNode.origin.key
      let category  = undefined 
      let findCategoryFn = (data?)=>{
        if (!data) data = this.policyInfo
        let row = data.children.find(c=>c.key == key)
        if (row) {
          category = row 
          return         
        }else{
          data.children.forEach((c)=>{
            findCategoryFn(c)
          })
        }
      }
      findCategoryFn()
      if (category){
        return category
      }    
    }

    //生产随机key
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }  

    //把policyInfo的children转成block
    formatServicePolicyInfo(info){
      info.children.forEach(child=>{
        info.block = info.block || []
        if (child.type == 'category'){
          info.block.push({
            name : child.name,
            children : child.children || []
          })          
        }else{
          if (child.fileLists){
            info.file = child.fileLists ? _.castArray(child.fileLists) : [] 
          }          
          // info.block.push({
          //   name : child.file_name,
          //   children : [],
          //   file : child.fileLists ? _.castArray(child.fileLists) : [] 
          // })
        }   
        if (info.block.length == 0) delete info.block 
      })
      if (info.block){
        info.block.forEach(block=>{
          if (!block.file || block.file.length == 0){
            delete block.file
          }
          this.formatServicePolicyInfo(block)
        })        
      }      
      delete info.children 
    }

}



