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
  files = []
  changepolicyname: any
  list = []
  policycode: any
  seq: any
  emiallist=[]
  _ApiUrl = ApiUrl
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
    this.metadataSchemeId = '1ba3f302-a027-4956-af0f-e2582b3068f9'
    this.showTemplateXml = res.showTemplateXml
  
  }

  async editRecord() {
    let validPass = await this.appRecord.editRecord()//公用
    if (!validPass){
        this.loading = false
        return 
    }
    await this.elecDocument.saveFileInfo(this.info.jsonData)
    await this._AppService.createRecord(this.info.jsonData)

    // let res = await this._AppService.uodataRecordemial('bf834182988693504', '1', this.jsonMetadataTemplate)
  }

  get_dwClassManageServiceGetMetaSysClassList() {

  }

  get_dwClassManageServiceGetMetadataCategoryInfo() {

  }

}
