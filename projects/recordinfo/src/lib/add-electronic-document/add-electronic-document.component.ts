/* isExport : YES , type : BASE COMPONENT
/***********************************************************************************************
 ***             C O N F I D E N T I A L  ---  A M B E R D A T A                             ***
 ***********************************************************************************************
 *                                                                                             *
 *                 Project Name : 电子文件著录系统                                                    *
 *                                                                                             *
 *                    File Name : add-electronic-document.component.ts                         *
 *                                                                                             *
 *                   Programmer : qichangjun                                                   *
 *                                                                                             *
 *                   Start Date : 6月1日, 2020                                                      *
 *                                                                                             *
 *                  Last Update : 6月23日 下午12:46,2020                                             *
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
 *   findBlockByNameAndLevel -- 根据block的名称和层级找到指定的block对象                             *
 *   findFileType -- 根据key找到相关节点的父节点.                                                   *
 *   guid -- 生产随机的key.                                                                       *
 *   formatServicePolicyInfo -- 将children转换成block                                             *
 *   getWholePath -- 获取从当前file-type节点到根路径的path                                           *
 *   setWholePathForEachBlock  --  给电子文件节点开始的block下面所有block添加path路径                  *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import { Component, forwardRef, Input, Output, ViewChild, OnInit, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { NzNotificationService } from 'ng-zorro-antd';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import * as _moment from 'moment';

import { NzFormatBeforeDropEvent } from 'ng-zorro-antd';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
// import {JSONPath} from 'jsonpath-plus';

const moment = _moment;
declare var JSONPath: any;
declare var jsonPath: any;
@Component({
  selector: 'add-electronic-document',
  templateUrl: './add-electronic-document.component.html',
  styleUrls: ['./add-electronic-document.component.scss'],
})
export class addElectronicDocumentComponent implements OnInit, OnChanges {
  activedNode: NzTreeNode;
  defaultFileLists: any[] = []
  policyInfo: PolicyInfo = { children: [] }
  currentPolicy: any = 'default'
  policyLists: any[] = []
  disableChangePolicy: boolean = false
  fileJsonPath: string = ''
  relativePath: any//上传时候的relativePath
  hasNoFileBlock: boolean = false
  @Input() id: string //record的id
  @Input() environmentBaseUrl: string
  @Input() objectPath: string
  @Input() baseUrl: string
  @Input() ApiUrl: any
  @Input() AuthenticationService: any
  @Input() metadataSchemeId: string
  @Input() jsonMetadataTemplate: any
  @Input() disableEdit: boolean;
  @Input() scene?: string
  @Input() getPolicyInfoPomise: (metadataId: string) => Promise<any>
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

  constructor() { }


  ngOnInit() {

  }
  //不是file_type类型不能选中
  activeNode(data: NzFormatEmitEvent): void {
    if (data.node.origin.type == 'file_type') {
      this.activedNode = data.node;
      this.getWholePath()
    }
  }

  //切换文件策略，次方法不会根据jsonData中的文件，吧文件初始化进policy的json里           
  changePolicy() {
    let res = this.policyLists.find(policy => policy.policy.code == this.currentPolicy)
    this.activedNode = undefined
    if (res) {
      let policyInfo = _.cloneDeep(res)
      this.formatPoolicyInfo(policyInfo.policy, 0, false)
      this.policyInfo = policyInfo.policy
    } else {
      this.setToDefaultPolicy()
    }
  }

  //当没有匹配的版本文件策略时（策略code和版本好都匹配）调用
  //将policyInfo初始化成空
  // 找到原jsonData中的电子文件节点下的file集合放到this.defaultFileLists中    
  setToDefaultPolicy() {
    this.currentPolicy = 'default'
    this.defaultFileLists = []
    this.policyInfo = { children: [] }
    let block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })
    if (block[0] && block[0].value.file) {
      let files = block[0].value.file ? _.castArray(block[0].value.file) : []
      this.defaultFileLists = files
    }
  }

  // 初始化时调用一次
  // 获取文件策略集合
  // 找到jsonData中的电子文件节点，判断是否有文件策略
  // 若没有，或者没有与文件策略集合中匹配的，则调用setToDefaultPolicy方法初始化为默认上传
  // 若有，则调用formatPoolicyInfo方法,把jsonData中的文件集合初始化到policy的json中
  async getPolicyInfo() {
    let policyInfo
    this.policyLists = await this.getPolicyInfoPomise(this.metadataSchemeId)
    let block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })
    //如果json里保存了文件策略     
    if (block[0] && block[0].value.policy) {
      this.disableChangePolicy = true
      let policy_version = block[0].value.policy_version
      let policy_code = block[0].value.policy
      let res = this.policyLists.find(policy => {
        return policy.policy.code == policy_code && policy_version == policy.policy.version_no
      })
      if (res) {
        policyInfo = _.cloneDeep(res)
        this.currentPolicy = policyInfo.policy.code
        this.formatPoolicyInfo(policyInfo.policy, 0, true)
        this.policyInfo = policyInfo.policy
      } else {
        this.setToDefaultPolicy()
      }
    }
    //没有默认用传统上传方式
    else {
      this.setToDefaultPolicy()
    }

  }

  /**
   * formupload上传完成时的回调
   * @param e {size,name,data}
   * 只有文件策略不是默认策略时，需要生成file的property
   */
  uploadFinish(e) {
    // let storagePath = e.data.storagePath.split('\\')
    let file: any = {
      checksum_type: 'md5',
      size: e.size,
      name: e.name,
      checksum: e.data.md5,
      format: e.data.contentType,
      'creation_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
      'modify_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
      'url': 'local:' + e.data.storagePath

      // 'url': 'local:\\' + storagePath[1] + '\\' + this.getWholePath() + storagePath[2]
    }
    if (this.currentPolicy != 'default') {
      // let fileType: FileType = this.findFileType()  
      file.seq = this.activedNode.getChildren().length + 1
      file.type = 'file'
      file.isLeaf = true
      file.key = this.guid()
      file.property = [
        {
          "name": "file_type",
          "title": "材料名称",
          "value": this.activedNode.origin.file_name
        }
      ]
      this.activedNode.addChildren([file])
      this.activedNode.update()
    } else {
      file.seq = this.defaultFileLists.length + 1
      this.defaultFileLists.push(file)
    }
  }
  /**
   * 保存文件信息
   * 在外部控件中把jsonMetadata传入，一般和recordinfo共享一个
   * @param jsonMetadata 外部空间的jsonData
   * 如果currentPolicy是默认策略，则直接把文件放进电子文件block下的file中
   * 否则调用formatServicePolicyInfo方法，生成对应的block
   */
  saveFileInfo(jsonMetadata) {
    let res = JSONPath.JSONPath({ path: this.fileJsonPath, json: jsonMetadata, resultType: 'all' })
    if (!res || !res[0]) return
    if (this.currentPolicy != 'default') {
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

  // 删除文件
  deleteFile(node) {
    node.remove()
  }

  // 预览文件
  async previewDoc(url) {
    if (!this.id) {
      return
    }
    let preview_window = window.open('')
    // let res = await this._RecordInfoService.getDocumentId(this.id, url)
    let objectId = this.objectPath + url
    objectId = objectId.replace(/\\/g, '/')
    preview_window.location.href = `${this.environmentBaseUrl}previewDoc?objectId=${objectId}&objectPath=${this.objectPath}&recordId=${this.id}&scene=${this.scene}`
    // this.router.navigate(['/previewDoc'], { queryParams: { objectId: res } })
  }

  //拖拽事件开始前的校验
  //只能拖拽到file节点的上下级和file_type节点内
  // po=0 为节点内，-1,1分别是下级和上级
  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s   
    if (arg.node.origin.type == 'file' && (arg.pos == 1 || arg.pos == -1)) {
      return of(true)
    }
    else if ((arg.node.origin.type == 'file_type' && arg.pos == 0)) {
      //  || (arg.node.parentNode && arg.node.parentNode.origin.type == 'file_type'))  {
      return of(true)
    } else {
      alert('只能将文件放入附件节点')
      return of(false)
    }
  }

  //拖拽事件结束后，删除原本的节点内容，貌似为插件自带的bug,所以需要在这里手动删除一下
  dragEnd(event: NzFormatEmitEvent) {
    let file_types: any = this.findFileType(event.dragNode.key)
    let key
    if (event.node.origin.type == 'file_type') {
      key = event.node.key
    } else if (event.node.origin.type == 'file') {
      key = event.node.getParentNode().key
    }
    file_types = file_types.find((file_type) => file_type.key != key)
    if (file_types) {
      _.remove(file_types.children, (child) => {
        return child.key == event.dragNode.key
      })
    }
  }

  ngOnChanges() {
    if (this.metadataSchemeId && this.jsonMetadataTemplate) {
      this.disableChangePolicy = false
      this.fileJsonPath = !Array.isArray(this.jsonMetadataTemplate.record.block) ? "$.record.block" :
        "$.record.block[?(@.name=='电子文件')]"
      let block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })
      if (!block || !block[0]) {
        this.hasNoFileBlock = true
        return
      }
      this.hasNoFileBlock = false
      this.getPolicyInfo()
    }
  }

  //---------------------util方法------------
  //吧policy的json格式化成tree
  formatPoolicyInfo(info, level: number, needInitFile?: boolean, path = '/电子文件'): void {
    info.children = info.children ? _.castArray(info.children) : []
    if (info.category) {
      info.category = info.category ? _.castArray(info.category) : []
      info.category.forEach(c => {
        c.path = path + '/' + c.name
        c.type = 'category'
        c.key = this.guid()
      })
      info.children = info.children.concat(info.category)
    }
    if (info.file_type) {
      info.file_type = info.file_type ? _.castArray(info.file_type) : []
      info.file_type.forEach(c => {
        c.type = 'file_type'
        // c.isLeaf = false
        c.key = this.guid()
        if (needInitFile) {
          let children = this.findBlockByNameAndLevel(info.name, level, info.path)
          if (children) {
            children.forEach(file => {
              file.key = this.guid()
              file.type = 'file'
              file.isLeaf = true
              if (!Array.isArray(file.property)) {
                file.property = [
                  {
                    "name": "file_type",
                    "title": "材料名称",
                    "value": file.property['content']
                  }
                ]
              }
            })
            c.children = children.filter(file => {
              return file.property[0].value == c.file_name
            })
          }
        }
      })
      info.children = info.children.concat(info.file_type)
    }
    info.children.forEach(child => {
      this.formatPoolicyInfo(child, level + 1, needInitFile, child.path)
    });
  }

  //根据block名和层级寻找block        
  //吧json里的file集合取出来放进对应的policy的json里    
  //返回block的文件集合  
  findBlockByNameAndLevel(name, level, path): FileType_File[] | false {
    let block_entity
    let file_block = JSONPath.JSONPath({ path: this.fileJsonPath, json: this.jsonMetadataTemplate, resultType: 'all' })
    file_block = _.cloneDeep(file_block[0].value)
    this.setWholePathForEachBlock(file_block)
    if (!file_block) return false
    let fn = (_file_block, self_level) => {
      if (self_level == level && _file_block.name == name && _file_block.path == path) {
        block_entity = _.cloneDeep(_file_block)
        return
      } else {
        if (!_file_block.block) return
        _file_block.block = _file_block.block ? _.castArray(_file_block.block) : []
        _file_block.block.forEach(c => {
          return fn(c, self_level + 1)
        })
      }
    }
    fn(file_block, 0)
    return block_entity && block_entity.file ? _.castArray(block_entity.file) : []
  }

  //给电子文件节点开始的block下面所有block添加path路径
  setWholePathForEachBlock(file_block, path = '') {
    file_block.path = path + '/' + file_block.name
    if (file_block.block) {
      file_block.block = file_block.block ? _.castArray(file_block.block) : []
      file_block.block.forEach((block) => {
        this.setWholePathForEachBlock(block, file_block.path)
      })
    }
  }


  /**
   * 根据key找到文件资料节点
   * @param key 节点的key,不传时默认查当前节点的key
   */
  findFileType(key?: string): any[] {
    if (!key) key = this.activedNode.origin.key
    let category = []
    let findCategoryFn = (data?) => {
      if (!data) data = this.policyInfo
      if (data.children) {
        let row = data.children.find(c => c.key == key)
        if (row) {
          category.push(data)
        }
        data.children.forEach((c) => {
          findCategoryFn(c)
        })
      }
    }
    findCategoryFn()
    if (category) {
      return category
    }
  }

  //生产随机key
  guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  //把policyInfo的children转成block
  formatServicePolicyInfo(info): void {
    info.children.forEach(child => {
      info.block = info.block || []
      if (child.type == 'category') {
        info.block.push({
          name: child.name,
          children: child.children || []
        })
      } else if (child.type == 'file_type') {
        child.children = child.children ? _.castArray(child.children) : []
        if (child.children.length > 0) {
          let file_lists = _.cloneDeep(child.children)
          file_lists.forEach((file) => {
            delete file.level
            delete file.isLeaf
            delete file.key
            delete file.type
            delete file.children
            file.property = [
              {
                "name": "file_type",
                "title": "材料名称",
                "value": child.file_name
              }
            ]
          })
          info.file = info.file ? info.file.concat(file_lists) : file_lists
        }
      }
      if (info.block.length == 0) delete info.block
    })
    if (info.block) {
      info.block.forEach(block => {
        if (!block.file || block.file.length == 0) {
          delete block.file
        }
        this.formatServicePolicyInfo(block)
      })
    }
    delete info.children
  }


  //从当前路径开始获取到根节点的路径集合
  getWholePath(): string {
    let path = ''
    let relativePath = ''
    let parent = this.activedNode
    while (parent.getParentNode()) {
      parent = parent.getParentNode()
      if (parent.isLeaf) {
        relativePath = '/' + parent.origin.name + relativePath
        path = path + '/' + parent.origin.file_name
      } else {
        relativePath = '/' + parent.origin.name + relativePath
        path = path + '/' + parent.origin.name
      }
    }
    this.relativePath = relativePath
    path = path.split('/').reverse().join('\\')
    return path
  }


}

interface PolicyInfo {
  version_no?: string;
  code?: string;
  children: Category[] | FileType[]
}
//-----------------------file_type类型--------------------------
interface FileType {
  type: 'file_type';
  isLeaf: boolean
  key: string
  file_name: string
  children: FileType_File[]
}

interface FileType_File {
  checksum_type?: 'md5'
  size?: number
  checksum?: string
  format?: string
  creation_date?: string
  modify_date?: string
  url?: string
  property?: File_Property[]
  seq?: number
  name?: string
  key?: string
  type?: string
  isLeaf?: boolean
}
interface File_Property {
  name: "file_type"
  title: "材料名称"
  value: string
}
//---------------------------category类型--------------------------
interface Category {
  type: "category"
  name: string
  isLeaf: boolean
  key: string
  children: Category[] | FileType[]
}