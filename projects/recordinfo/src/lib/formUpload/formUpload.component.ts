import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    selector: 'form-upload',
    templateUrl: './formUpload.component.html',
    styleUrls: ['./formUpload.component.scss'],
})
export class FormUploadComponent implements OnInit {
    // public uploader: FileUploader;
    @Input() disabledUpload: any = false
    @Input() attrName: any;
    @Input() uploadUrl: string;
    @Input() additionalParams: any = {};
    @Input() updataDetail: any

    @Input() ApiUrl: any
    @Input() baseUrl: string
    @Input() AuthenticationService: any

    @Output() uploadFinish: EventEmitter<any> = new EventEmitter();
    uploader = new FileUploader({
        autoUpload: true,
        // url: this.baseUrl + this.ApiUrl[url],   
        url: '/ermsapi/resource/upload_file',
        headers: [
            { name: 'accessToken', value: 'db4d40c5a4dfe5408bca993c66f1664d' }
        ]
        , additionalParameter: {
        },
    });

    constructor(
        private notification: NzNotificationService,
    ) {
        this.uploader.onBeforeUploadItem = (item) => {
            for (let key in this.additionalParams) {
                this.uploader.options.additionalParameter[key] = this.additionalParams[key]
            }
            this.uploader.options.additionalParameter['relativePath'] = '/' + this.attrName + '/' + item._file.name
        }
        this.uploader.onSuccessItem = (item, res) => {
            if (res) {
                let data = JSON.parse(res)
                this.uploadFinish.emit({
                    data: data,
                    attrName: this.attrName,
                    name: item._file.name,
                    size: item._file.size,
                })
                item.remove()
                return
            }
            item.isSuccess = false
            item.isError = true
        }
        this.uploader.onErrorItem = (item, res) => {
            let data = JSON.parse(res)
            this.notification.blank(
                data.message,
                ''
            );
        }
    }

    ngOnInit() {
        let url
        this.uploadUrl == 'importRecord' ? url = 'importRecord' : url = 'upload'
        if (!this.baseUrl || !this.ApiUrl) return


    }

}
