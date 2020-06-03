import { NgModule } from '@angular/core';
import { RecordinfoComponent } from './recordinfo.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

@NgModule({
  declarations: [ShowProcessDetailDialog,Sizefilter,FormUploadComponent,chooseClassModuleContentComponent,
    LoadingButtonControllerDirective,LoadingMessageComponent,RecordinfoComponent,InitTableValueDirective,
    fileNameToIconfilter,FormValidPassDirective,FormOtherCompComponent,FormSelectUserDialog,FormChooseCategoryDialog,addElectronicDocumentComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    NzTreeSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    NzTreeModule,
    FormsModule,
    NzNotificationModule,
    NzUploadModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    NzDatePickerModule
  ],
  exports: [RecordinfoComponent,InitTableValueDirective,fileNameToIconfilter,FormValidPassDirective,addElectronicDocumentComponent],
  entryComponents:[FormSelectUserDialog,FormChooseCategoryDialog,ShowProcessDetailDialog]
})
export class RecordinfoModule { }
