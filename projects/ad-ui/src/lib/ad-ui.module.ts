import { NgModule } from '@angular/core';
import { AdUiComponent } from './ad-ui.component';
import { AdTreeModule } from './ad-tree/ad-tree.module';
import { AdScrollBoxModule } from './ad-scroll-box/ad-scroll-box.module';
import { scrollBoxBtn } from './ad-scroll-box/ad-scroll-box-btn.directive';
import { AdScrollBoxComponent } from './ad-scroll-box/ad-scroll-box.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [AdUiComponent],
  imports: [
    AdTreeModule,
    AdScrollBoxModule,
    CommonModule
  ],
  exports: [AdUiComponent,AdTreeModule,AdScrollBoxModule]
})
export class AdUiModule { }
