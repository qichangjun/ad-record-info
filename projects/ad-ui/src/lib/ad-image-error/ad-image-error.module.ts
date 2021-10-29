import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdImageError } from './ad-image-error.directive';
@NgModule({
  declarations: [AdImageError],
  imports: [
    CommonModule,    
    FormsModule, ReactiveFormsModule
  ],  
  exports:[AdImageError]
})
export class AdImageModule { }
