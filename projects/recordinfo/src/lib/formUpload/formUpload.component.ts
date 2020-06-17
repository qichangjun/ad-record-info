import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    selector: 'form-upload',
    templateUrl: './formUpload.component.html',
    styleUrls: ['./formUpload.component.scss'],
})
export class FormUploadComponent implements OnInit, OnChanges {
    public uploader: FileUploader = new FileUploader({});;
    @Input() disabledUpload: any = false
    @Input() attrName: any;
    @Input() uploadUrl: string;
    @Input() additionalParams: any = {};
    @Input() updataDetail: any
    @Input() relativePath:any
    @Input() ApiUrl: any
    @Input() baseUrl: string
    @Input() AuthenticationService: any

    @Output() uploadFinish: EventEmitter<any> = new EventEmitter();

    constructor(
        private notification: NzNotificationService,
    ) {
        if (!this.baseUrl || !this.ApiUrl) return

    }

    ngOnInit() {



    }

    ngOnChanges() {
        if (this.baseUrl && this.ApiUrl) {
            let url
            this.uploadUrl == 'importRecord' ? url = 'importRecord' : url = 'upload'
            this.uploader.setOptions({
                autoUpload: true,
                url: this.baseUrl + this.ApiUrl[url],
                // url: '/ermsapi/resource/upload_file',
                headers: [
                    { name: 'accessToken', value: this.AuthenticationService.getAccessToken() }
                    // { name: 'accessToken', value:"fd2ff8cc80616166d8fd3db02c9d2194" }
                ]
                , additionalParameter: {
                },
            })
            this.uploader.onBeforeUploadItem = (item) => {
                for (let key in this.additionalParams) {
                    this.uploader.options.additionalParameter[key] = this.additionalParams[key]
                }
                if(!this.relativePath)this.relativePath=''
                this.uploader.options.additionalParameter['relativePath'] =this.relativePath
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
    }

}
