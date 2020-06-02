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
export class addElectronicDocumentComponent implements OnInit {
    @ViewChild('nzTreeSelect') nzTreeSelect: any;
    loading: boolean = false;
    classList: Array<any> = [];
    selectedItem: any = {}
    @Input() policys: any
    @Input() policynamelist: any
    @Output() updateInfo: EventEmitter<any> = new EventEmitter();
    filelist = []
    difendemail:any
    constructor(
        private notification: NzNotificationService,
    ) {
    }

    ngOnInit() {
        console.log(this.updateInfo)
    }
    getchangepolicyname(value) {
        this.updateInfo.emit({ changepolicyname: value.name })
    }
    async uploadFinish(event,property) {
        let format = event.name.split('.')
        format = format[format.length - 1]
        this.filelist.push({
            'type':property,
            'url': 'local:' + event.data.storagePath,
            'size': event.size,
            'name': event.name,
            'checksum_type': "md5",
            'checksum': event.data.md5,
            'isNew': true,
            'format': format,
            'creation_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
            'modify_date': moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL)
        })
        this.updateInfo.emit({ files:this.filelist })
    }


}



