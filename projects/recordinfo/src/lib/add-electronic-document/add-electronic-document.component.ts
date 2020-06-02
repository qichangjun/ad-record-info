import { Component, forwardRef, Input, Output, ViewChild, OnInit, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import * as _moment from 'moment';
const moment = _moment;

@Component({
    selector: 'add-electronic-document',
    templateUrl: './add-electronic-document.component.html',
    styleUrls: ['./add-electronic-document.component.scss'],
})
export class addElectronicDocumentComponent implements OnInit, OnChanges {
    @ViewChild('nzTreeSelect') nzTreeSelect: any;
    loading: boolean = false;
    classList: Array<any> = [];
    selectedItem: any = {}
    @Input() policys: any
    @Input() policynamelist: any
    @Output() updateInfo: EventEmitter<any> = new EventEmitter();
    policycode: any
    filelist = []
    difendemail: any
    @Input() jsonMetadataTemplate: any
    constructor(
        private notification: NzNotificationService,
    ) {
    }

    ngOnInit() {
        // console.log(  this.jsonMetadataTemplate.record)

    }
    ngOnChanges() {
        this.jsonMetadataTemplate.record.block.map(c => {
            if (c.name == '电子文件') {
                c.block.map(file => {
                    file.file.map(emial => {
                        emial.type = file.name
                        this.filelist.push(emial)
                    })
                })
            }
        })
        console.log(this.filelist)
    }
    getchangepolicyname(value) {
        this.updateInfo.emit({ changepolicyname: value.name })
        this.policycode = value.code
        this.updateInfo.emit({ policycode: this.policycode })
    }
    async uploadFinish(event, property) {
        console.log(property)
        let same = false
        this.updateInfo.emit({ seq: property.seq })
        let format = event.name.split('.')
        format = format[format.length - 1]
        let res = []
        let seq = []
        let maxseq
        console.log(this.filelist)
        this.filelist.map(c => {
            if (c.type == property.name) {
                res.push(c)
                res.map(c => {
                    seq.push(c.seq)
                })
                maxseq = Math.max.apply(null, seq)
            }
        })
        if (maxseq) {
            this.filelist.push({
                'type': property.name,
                'url': 'local:' + event.data.storagePath,
                'size': event.size,
                'name': event.name,
                'checksum_type': "md5",
                'checksum': event.data.md5,
                'isNew': true,
                'format': format,
                'seq': maxseq + 1,
                'creation_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
                'modify_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL)
            },
            )
        } else {
            this.filelist.push({
                'type': property.name,
                'url': 'local:' + event.data.storagePath,
                'size': event.size,
                'name': event.name,
                'checksum_type': "md5",
                'checksum': event.data.md5,
                'isNew': true,
                'format': format,
                'seq': 0,
                'creation_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
                'modify_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL)
            },
            )
        }
        this.updateInfo.emit({ files: this.filelist })
    }


}



