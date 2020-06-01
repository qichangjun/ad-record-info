import {
  Component,
  ViewChild
} from '@angular/core';
import {
  AppService
} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('appRecord') appRecord: any;
  editStatus: boolean = false;
  jsonMetadataTemplate: any = undefined
  showTemplateXml: any = undefined
  loading: boolean = false
  info: any = {}
  emial: any
  files = [{
      s_modify_date: "2020-03-18T20:44:05.470+08:00",
      'jcr:created': "2020-03-18T20:44:05.468+08:00",
      'jcr:path': "/金华市人民检察院/文件收集/部门文件/监察部/02155e5f-5b6f-4af1-8034-70cfb0fec602",
      'category_code': "WS·A",
      's_md5': 'asdawdawdawdaw',
      'jcr:createdBy': "朱占豪",
      'jcr:primaryType': "da_record",
      's_object_id': 'asdadawdawdaw',
      s_object_name: "02155e5f-5b6f-4af1-8034-70cfb0fec602",
      title: "dd"
    },
    {
      s_modify_date: "2020-03-16T17:33:28.463+08:00",
      'jcr:created': "2020-03-16T17:33:27.961+08:00",
      s_md5: "e441a079dc72f24f0314534cf17927a7",
      'jcr:path': "/金华市人民检察院/文件收集/部门文件/监察部/导入少两文件集.xlsx",
      s_content_size: "15572",
      's_object_id': 'dqwdqwdqwdqwdqw',
      'jcr:createdBy': "朱占豪",
      'jcr:primaryType': "da_document",
      s_object_name: "导入少两文件集.xlsx"
    }
  ]
  constructor(
    public _AppService: AppService,
  ) {

  }
  ngOnInit() {
    this.getRecordInfo()
    this.getRecordemial()
  }

  async getRecordemial() {
    this.emial = await this._AppService.getRecordemial()
  }

  async getRecordInfo() {
    let res = await this._AppService.getRecordInfo()
    res.jsonMetadata = JSON.parse(res.jsonMetadata)
    this.jsonMetadataTemplate = res.jsonMetadata
    this.showTemplateXml = res.showTemplateXml
    this.editStatus = false
  }

  async editRecord() {
    let validPass = await this.appRecord.editRecord() //公用
    console.log(validPass)
    let documentIds: Array < any > = []
    if (this.files && this.files.length > 0) {
      documentIds = this.files.filter((c: any) => c.isChoosed).map(c => c['jcr:path'])
    }
    console.log(this.info)
  }

  get_dwClassManageServiceGetMetaSysClassList() {

  }

  get_dwClassManageServiceGetMetadataCategoryInfo() {

  }
}