import { NgModule } from '@angular/core';
import { AdUiComponent } from './ad-ui.component';
import { AdTreeModule } from './ad-tree/ad-tree.module';
import { AdScrollBoxModule } from './ad-scroll-box/ad-scroll-box.module';
import { AdImageModule } from './ad-image-error/ad-image-error.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [AdUiComponent],
  imports: [
    AdTreeModule,
    AdScrollBoxModule,
    AdImageModule,
    CommonModule
  ],
  exports: [AdUiComponent,AdTreeModule,AdScrollBoxModule,AdImageModule]
})
export class AdUiModule { }
