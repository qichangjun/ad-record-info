import { NgModule } from '@angular/core';
import { AdUiComponent } from './ad-ui.component';
import { AdTreeModule } from './ad-tree/ad-tree.module';

@NgModule({
  declarations: [AdUiComponent],
  imports: [
    AdTreeModule
  ],
  exports: [AdUiComponent,AdTreeModule]
})
export class AdUiModule { }
