import { AdFullTextComponent } from './ad-full-text/ad-full-text.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdUiTreeComponent } from './ad-ui-tree/ad-ui-tree.component';
import { AdRecordinfoComponent } from './ad-recordinfo/ad-recordinfo.component';
import { AdUiScrollBoxComponent } from './ad-ui-scroll-box/ad-ui-scroll-box.component';
const routes: Routes = [
  { path:'',redirectTo:'tree',pathMatch:'prefix'},
  { path:'tree',component:AdUiTreeComponent},
  { path:'adRecord',component:AdRecordinfoComponent},
  { path:'fullText',component:AdFullTextComponent},
  { path:'scrollBox',component:AdUiScrollBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
