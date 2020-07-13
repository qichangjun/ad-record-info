import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecordinfoComponent } from './recordinfo.component';

import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { InitTableValueDirective } from './initTableValue.directive';
import { FormValidPassDirective } from './formValidPass.directive';
import { FormOtherCompComponent } from './form-other-component/form-other-component.component';
import { FormSelectUserDialog } from './form-other-component/form-select-user/form-select-user.dialog';
import { FormChooseCategoryDialog } from './form-other-component/form-choose-category/form-choose-category.dialog';
import { LoadingMessageComponent } from './loadingMessage/loadingMessage.component';
import { LoadingButtonControllerDirective } from './loadingButton.directive';
import { chooseClassModuleContentComponent } from './choose-class-module/choose-class-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
describe('RecordinfoComponent', () => {
  let component: RecordinfoComponent;
  let fixture: ComponentFixture<RecordinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,NzDatePickerModule,
        FormsModule, ReactiveFormsModule,
        MatListModule,MatGridListModule,
        MatRadioModule,MatSelectModule,
        MatCheckboxModule,MatStepperModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        NzTreeSelectModule
      ],
      declarations: [ RecordinfoComponent ,
        InitTableValueDirective,
        FormValidPassDirective,
        FormOtherCompComponent,
        FormSelectUserDialog,
        FormChooseCategoryDialog,
        LoadingMessageComponent,
        LoadingButtonControllerDirective,
        chooseClassModuleContentComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
