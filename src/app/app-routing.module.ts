import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdUiTreeComponent } from './ad-ui-tree/ad-ui-tree.component';
import { AdRecordinfoComponent } from './ad-recordinfo/ad-recordinfo.component';

const routes: Routes = [
  { path:'',redirectTo:'tree',pathMatch:'prefix'},
  { path:'tree',component:AdUiTreeComponent},
  { path:'adRecord',component:AdRecordinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
