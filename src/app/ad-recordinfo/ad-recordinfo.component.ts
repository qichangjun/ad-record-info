import { JSONPath } from 'jsonpath-plus';
import { Component, forwardRef, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {AppService} from '../app.service';
import { ApiUrl } from '../ApiUrl.enum';
@Component({
  selector: 'app-ad-recordinfo',
  templateUrl: './ad-recordinfo.component.html',
  styleUrls: ['./ad-recordinfo.component.scss']
})
export class AdRecordinfoComponent implements OnInit {
  @ViewChild('appRecord') appRecord: any;
  @ViewChild('elecDocument') elecDocument : any 
  info: any = {}
  metadataSchemeId : string 
  editStatus: boolean = false;
  jsonMetadataTemplate: any = undefined
  showTemplateXml: any = undefined
  loading: boolean = false
  emial: any
  policys: any
  policynamelist: any
  objectPath:string
  files = []
  changepolicyname: any
  list = []
  policycode: any
  seq: any
  emiallist=[]
  _ApiUrl = ApiUrl
  selectedUser = '审计员_01(qxcs_sjy_1403)'
  optionList = [{
    displayName : '审计员_01(qxcs_sjy_1403)',
    value : '审计员_01(qxcs_sjy_1403)',
    defaultImg : 'http://hzent.amberdata.cn:9280/metadata/assets/images/default-user.png'
  }]
  constructor(
    public _AppService: AppService,
  ) {

  }
  ngOnInit() {
    this.getRecordInfo()
  }

  async getRecordInfo() {
    // let res = await this._AppService.getRecordInfo()    
    let res = await this._AppService.getRecordJson()   
    res.jsonMetadata = JSON.parse(res.jsonMetadataTemplate)        
    this.jsonMetadataTemplate = res.jsonMetadata
    this.objectPath=res.objectPath
    this.metadataSchemeId = '5a228aca-3d76-478b-b009-8643ab0d3338'
    this.showTemplateXml = res.showTemplateXml  
  }

  async editRecord() {
    let validPass = await this.appRecord.editRecord()//公用    
    // if (validPass.length > 0){
    //     this.loading = false
    //     return 
    // }    
    await this.elecDocument.saveFileInfo(this.info.jsonData)    
    console.log(this.info.jsonData)
    // await this._AppService.createRecord(this.info.jsonData)
    // let res = await this._AppService.uodataRecordemial('bf834182988693504', '1', this.jsonMetadataTemplate)
  }

  get_dwClassManageServiceGetMetaSysClassList() {

  }

  get_dwClassManageServiceGetMetadataCategoryInfo() {

  }

}
