import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordinfoModule } from '../../projects/recordinfo/src/lib/recordinfo.module';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import { AdUiScrollBoxComponent } from './ad-ui-scroll-box/ad-ui-scroll-box.component';
import zh from '@angular/common/locales/zh';
import { AdUiModule } from '../../projects/ad-ui/src/lib/ad-ui.module';
import { AdUiTreeComponent } from './ad-ui-tree/ad-ui-tree.component';
import { AdRecordinfoComponent } from './ad-recordinfo/ad-recordinfo.component';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    AdUiTreeComponent,
    AdRecordinfoComponent,
    AdUiScrollBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecordinfoModule,
    AdUiModule
  ],
  providers: [
    {provide:'assetsUrl',useValue:environment.assetsUrl},
    // { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
