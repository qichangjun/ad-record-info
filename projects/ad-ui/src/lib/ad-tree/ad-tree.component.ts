import { AfterViewInit, Component, OnInit,Output, EventEmitter,
  ViewChild,Input,OnChanges,SimpleChange,TemplateRef,ContentChild} from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions,NzTreeNode } from 'ng-zorro-antd';
import { AdTreeOption as Options, clickNodeEvent } from './ad-tree.interface';
import * as _ from 'lodash'
import { AdTreeService } from './ad-tree.service';

@Component({
  selector: 'ad-tree',
  templateUrl: './ad-tree.component.html',
  styleUrls: ['./ad-tree.component.scss']
})
export class AdTreeComponent implements OnInit,OnChanges {
  searchValue : string = ''
  @Input() enableSearch : boolean = false
  @Input() option: Options;  
  @Input() ids : string[]  
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  @Output() clickTree: EventEmitter<any> = new EventEmitter();
  @Output() checkBoxChange: EventEmitter<any> = new EventEmitter();
  @Input() nzTreeTemplateDiy?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;  
  defaultOptions : Options 
  public activedNode: NzTreeNode;

  constructor(
    public _AdTreeService : AdTreeService
  ){}
  ngOnInit(): void {
    this.defaultOptions= {
      url : '',
      rootId : 0,
      formatDataFn:this.formatData.bind(this),
      ajaxFilterFn : this.ajaxFilter.bind(this),
      beforeGetChildrenFn : this.beforeGetChildren.bind(this),
      api : this.nzTreeComponent,
      data : [],
      enableCheck : false,
      autoParameter : ['parentId=id']
    }
  }

  ngAfterViewInit(): void {
  }

  /**
   * 
   * @param data 默认后台返回的数据
   * [{parentId,id,name,childCount}]
   * 转换成 NzTreeNodeOptions 的格式
   */
  private formatData(data:any[]):NzTreeNodeOptions[]{
    data.forEach(node => {
      node.isLeaf = node.childCount == 0 || !node.childCount
      node.title = node.name
      node.key = node.id 
      node.children = node.children || []
      if (this.option.additionRootData || node.parentId != this.option.rootId){
        let parentNode :NzTreeNodeOptions = data.find(c=>c.id == node.parentId)
        if (parentNode){
          parentNode.children = parentNode.children || []                
          parentNode.children.push(node)
        }        
      }
    });
    _.remove(data,(c=>{
      if (this.option.additionRootData){
        return c.key != this.option.rootId
      }else{
        return c.parentId != this.option.rootId
      }      
    }))
    return data
  }

  private ajaxFilter(data:any[]):NzTreeNodeOptions[]{
    data.forEach(node=>{
      node.isLeaf = node.childCount == 0 || !node.childCount
      node.title = node.name
      node.key = node.id 
      node.children = node.children || []
    })   
    return data
  }

  private beforeGetChildren(node:NzTreeNode){
    return 
  }

  public nzCheckBox(event: NzFormatEmitEvent){
    this.checkBoxChange.emit(event)
  }
  public async nzCheck(event: NzFormatEmitEvent) {    
    // load child async    
    if (event.eventName === 'expand' || event.eventName === 'click') {    
      const node = event.node;      
      if (node && !node.isLeaf      
        && node.isExpanded) {
          node.clearChildren()
        node.isLoading = true
        this.option.beforeGetChildrenFn(node)
        let additionParams = Object.assign({},this.option.additionParams)
        this.option.autoParameter.forEach((autoParameter)=>{
          let param = autoParameter.split('=')
          if (param.length < 2){
            console.error(`${param}的格式不正确，应该以=隔空，例如:parentId=id`)
            return 
          }
          additionParams[param[0]] = event.node.origin[param[1]]
        })
        let res = await this._AdTreeService.getTreeChildren(
          this.option.url,
          this.option.headers,
          additionParams     
        )
        let data = await this.option.ajaxFilterFn(res,node)
        node.addChildren(data);     
        node.isLoading = false
      }
    }
  }

  public activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
    let ids = this.getWholePath()
    let clickNodeParams : clickNodeEvent = {node : this.activedNode,ids}
    this.clickTree.emit(clickNodeParams)
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {        
        node.isExpanded = !node.isExpanded;
      }
    }
    this.nzCheck(data)
  }

  private getWholePath() : string[] {
    let ids = [this.activedNode.key]
    let parent = this.activedNode
    while (parent.getParentNode()) {
      parent = parent.getParentNode()
      ids.push(parent.key)
    }
    ids = ids.reverse()
    return ids
  }

  private async initTree() {
    this.option = _.merge(this.defaultOptions, this.option)   
    let res = await this._AdTreeService.getTreeDataPaths(
      this.option.url,
      this.option.headers,
      this.option.additionParams,
      this.ids
    )
    if (this.option.additionRootData){
      let additionRootData = _.cloneDeep(this.option.additionRootData)
      res = res.concat(additionRootData)
    }    
    this.option.data = this.option.formatDataFn(res)   
    this.expandNodeByIds()
  }

  private expandNodeByIds():void{
    setTimeout(()=>{
      this.ids.forEach(id=>{
        let node = this.nzTreeComponent.getTreeNodeByKey(id)   
        if (node){
          node.isExpanded = true 
        }
      })
      this.activedNode = this.nzTreeComponent.getTreeNodeByKey(this.ids[this.ids.length - 1])         
    })
  }

  public async updateNode(key:string){
    let node = this.nzTreeComponent.getTreeNodeByKey(key)   
    node.clearChildren()
    this.option.beforeGetChildrenFn(node)
    let additionParams = Object.assign({},this.option.additionParams)
    this.option.autoParameter.forEach((autoParameter)=>{
      let param = autoParameter.split('=')
      if (param.length < 2){
        console.error(`${param}的格式不正确，应该以=隔空，例如:parentId=id`)
        return 
      }
      additionParams[param[0]] = node.origin[param[1]]
    })
    let res = await this._AdTreeService.getTreeChildren(
      this.option.url,
      this.option.headers,
      additionParams      
    )    
    let data = await this.option.ajaxFilterFn(res,node)
    if (data.length > 0 ){
      node.isLeaf = false 
    }
    node.addChildren(data);    
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }){
    if (changes['option']) {
      this.initTree()
    }
    if (changes['ids']){
      this.expandNodeByIds()
    }
  }
}
