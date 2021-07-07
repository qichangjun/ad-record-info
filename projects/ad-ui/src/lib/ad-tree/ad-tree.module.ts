import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdTreeComponent } from './ad-tree.component';
import { NzTreeModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdTreeComponent],
  imports: [
    CommonModule,
    NzTreeModule,
    FormsModule, ReactiveFormsModule
  ],
  exports:[AdTreeComponent]
})
export class AdTreeModule { }
