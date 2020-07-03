import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdTreeComponent } from './ad-tree.component';
import { NzTreeModule } from 'ng-zorro-antd';
@NgModule({
  declarations: [AdTreeComponent],
  imports: [
    CommonModule,
    NzTreeModule
  ],
  exports:[AdTreeComponent]
})
export class AdTreeModule { }
