import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DyformdemoFormlistComponent } from './formlist/formlist.component';

const routes: Routes = [

  { path: '', component: DyformdemoFormlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DyformdemoRoutingModule { }
