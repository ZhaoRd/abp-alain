import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './list/list.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [

  {
    path: '', component: RolesListComponent,
    canActivate: [AppRouteGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
