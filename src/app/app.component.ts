import { Component, forwardRef, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  AppService
} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('appRecord') appRecord: any;
  editStatus: boolean = false;
  jsonMetadataTemplate: any = undefined
  showTemplateXml: any = undefined
  loading: boolean = false
  info: any = {}
  emial: any
  policys: any
  policynamelist: any
  files = []
  changepolicyname: any
  list = []
  constructor(
    public _AppService: AppService,
  ) {

  }
  ngOnInit() {
    this.getRecordInfo()
    this.getRecordemial()
  }
  async getRecordemial() {
    let res = await await this._AppService.getRecordemial()
    for (let i in res) {
      this.list.push(res[i])
    }
    this.policynamelist = this.list
    if (!this.changepolicyname) {
      this.choserecordemial(this.list[0])
    }

  }
  choserecordemial(changepolicyname?) {
    this.list.map(c => {
      c.name == changepolicyname.name
      this.policys =c.category
    })

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
    let documentIds: Array<any> = []
    if (this.files && this.files.length > 0) {
      documentIds = this.files.filter((c: any) => c.isChoosed).map(c => c['jcr:path'])
    }
  }

  get_dwClassManageServiceGetMetaSysClassList() {

  }

  get_dwClassManageServiceGetMetadataCategoryInfo() {

  }

  updateInfo(event) {
    if (event.changepolicyname) {
      this.changepolicyname = event.changepolicyname
      this.choserecordemial(this.changepolicyname)
    }
    if (event.files) {
      this.files = event.files
    }
  }
}