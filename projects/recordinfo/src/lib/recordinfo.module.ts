import { RecordInfoSelectUsersComponent } from './choose-user/choose-user.component';
import { NgModule } from '@angular/core';
import { RecordinfoComponent } from './recordinfo.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NzSelectModule } from 'ng-zorro-antd';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InitTableValueDirective } from './initTableValue.directive';
import { fileNameToIconfilter } from './fileNameToIcon.pipe';
import { FormValidPassDirective } from './formValidPass.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FormOtherCompComponent } from './form-other-component/form-other-component.component';
import { FormSelectUserDialog } from './form-other-component/form-select-user/form-select-user.dialog';
import { FormChooseCategoryDialog } from './form-other-component/form-choose-category/form-choose-category.dialog';
import { LoadingMessageComponent } from './loadingMessage/loadingMessage.component';
import { LoadingButtonControllerDirective } from './loadingButton.directive';
import { chooseClassModuleContentComponent } from './choose-class-module/choose-class-module.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormUploadComponent } from './formUpload/formUpload.component';
import { Sizefilter } from './size.pipe';
import { ShowProcessDetailDialog } from './show-process-detail/show-process-detail.dialog';
import {addElectronicDocumentComponent } from './add-electronic-document/add-electronic-document.component';
import { NzUploadModule } from 'ng-zorro-antd';
import { NzInputModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd';
import { NzProgressModule } from 'ng-zorro-antd';
import { NzPopoverModule } from 'ng-zorro-antd';

import { NzSwitchModule } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
@NgModule({
  declarations: [RecordInfoSelectUsersComponent,ShowProcessDetailDialog,Sizefilter,FormUploadComponent,chooseClassModuleContentComponent,
    LoadingButtonControllerDirective,LoadingMessageComponent,RecordinfoComponent,InitTableValueDirective,
    fileNameToIconfilter,FormValidPassDirective,FormOtherCompComponent,FormSelectUserDialog,FormChooseCategoryDialog,addElectronicDocumentComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FileUploadModule,
    NzTreeSelectModule,
    NzSwitchModule,
    NzSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    NzTreeModule,
    NzPopoverModule,
    FormsModule,
    NzNotificationModule,
    NzUploadModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    NzDatePickerModule,
    NzIconModule,
    NzProgressModule
  ],
  exports: [RecordinfoComponent,
    InitTableValueDirective,
    fileNameToIconfilter,
    FormValidPassDirective,
    RecordInfoSelectUsersComponent,
    addElectronicDocumentComponent],
  entryComponents:[FormSelectUserDialog,FormChooseCategoryDialog,ShowProcessDetailDialog]
})
export class RecordinfoModule { }
