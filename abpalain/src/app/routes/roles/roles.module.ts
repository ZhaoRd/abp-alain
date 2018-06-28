import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesListComponent } from './list/list.component';
import { RolesCreateRoleComponent } from './create-role/create-role.component';
import { RolesEditRoleComponent } from './edit-role/edit-role.component';

const COMPONENTS = [
  RolesListComponent];
const COMPONENTS_NOROUNT = [
  RolesCreateRoleComponent,
  RolesEditRoleComponent];

@NgModule({
  imports: [
    SharedModule,
    RolesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RolesModule { }
