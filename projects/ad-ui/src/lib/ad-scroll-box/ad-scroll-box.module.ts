import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdScrollBoxComponent } from './ad-scroll-box.component';
import { scrollBoxBtn } from './ad-scroll-box-btn.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [scrollBoxBtn,AdScrollBoxComponent],
  imports: [
    CommonModule,    
    FormsModule, ReactiveFormsModule
  ],
  exports:[scrollBoxBtn,AdScrollBoxComponent]
})
export class AdScrollBoxModule { }
