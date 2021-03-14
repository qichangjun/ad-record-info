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
  files = [{
		"s_object_type": "da_document",
		"title": null,
		"da_submit_date": "2020-12-25 15:33:04",
		"da_convert_format": null,
		"exist_document": false,
		"s_create_date": "2020-12-25 15:32:33",
		"s_modifier": "erms_day_013",
		"s_modify_date": "2020-12-25 15:34:21",
		"da_submitter": "档案员131",
		"da_owner": "八戒(erms_001)",
		"da_md5": null,
		"da_submit_status": 2,
		"da_data_mode": "03",
		"da_convert_status": 0,
		"da_type": "电子文件",
		"s_object_name": "合同（修改版02）.xls",
		"da_secret_level": "L3",
		"s_owner": "bu842468591403008",
		"s_object_path": "/个人文件柜/bu842468591403008/文件归档/王阳专属文件夹/“电子”文件夹/合同（修改版02）.xls",
		"s_creator": "erms_day_013",
		"s_object_id": "bd000000180000f25",
		"da_archives_dept": "支付宝事业部/项目实施部"
	}, {
		"s_object_type": "da_document",
		"title": null,
		"da_submit_date": "2020-12-25 15:33:05",
		"da_convert_format": null,
		"exist_document": false,
		"s_create_date": "2020-12-25 15:32:37",
		"s_modifier": "erms_day_013",
		"s_modify_date": "2020-12-26 11:55:39",
		"da_submitter": "档案员131",
		"da_owner": "八戒(erms_001)",
		"da_md5": null,
		"da_submit_status": 2,
		"da_data_mode": "03",
		"da_convert_status": 0,
		"da_type": "电子文件",
		"s_object_name": "诉讼（修改版01）.xls",
		"da_secret_level": "L3",
		"s_owner": "bu842468591403008",
		"s_object_path": "/个人文件柜/bu842468591403008/文件归档/王阳专属文件夹/“电子”文件夹/诉讼（修改版01）.xls",
		"s_creator": "erms_day_013",
		"s_object_id": "bd000000180000f26",
		"da_archives_dept": "支付宝事业部/项目实施部"
	}]
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
    // if (!validPass){
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
