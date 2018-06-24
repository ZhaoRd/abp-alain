import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantsListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: TenantsListComponent},
  { path: 'list', component: TenantsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
