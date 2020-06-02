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
  @Input() info: any
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
      this.policys = c.category
    })

  }
  async getRecordInfo() {
    let res = await this._AppService.getRecordInfo()
    res.jsonMetadata = JSON.parse(res.jsonMetadata)
    this.jsonMetadataTemplate = res.jsonMetadata
    this.showTemplateXml = res.showTemplateXml
    this.jsonMetadataTemplate.record.block.map(c => {
      if (c.name == '电子文件') {
        this.emiallist=c.block
      }
    })
    this.editStatus = false
  }

  async editRecord() {
    let emial = []
    this.jsonMetadataTemplate.record.block.map(c => {
      if (c.name == '电子文件') {
        this.files.map(file => {
          emial.push({ file: [file], name: file.type })
        })
        c.block = emial
        c.policy = this.policycode
        c.policy_version = this.seq
      }
    })
    let res = await this._AppService.uodataRecordemial('bf834182988693504', '1', this.jsonMetadataTemplate)
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
    if (event.policycode) {
      this.policycode = event.policycode
    }
    if (event.seq) {
      this.seq = event.seq
    }
  }
}