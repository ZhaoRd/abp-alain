import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './list/list.component';
import { UsersCreateUserComponent } from './create-user/create-user.component';
import { UsersEditUserComponent } from './edit-user/edit-user.component';

const COMPONENTS = [
  UsersListComponent
  ];
const COMPONENTS_NOROUNT = [
  UsersCreateUserComponent,
  UsersEditUserComponent
];

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UsersModule { }
