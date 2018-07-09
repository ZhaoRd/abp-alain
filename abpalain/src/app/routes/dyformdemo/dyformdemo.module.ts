import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DyformdemoRoutingModule } from './dyformdemo-routing.module';
import { DyformdemoFormlistComponent } from './formlist/formlist.component';
import { DyformdemoCreateComponent } from './formlist/create/create.component';
import { DyformdemoEditComponent } from './edit/edit.component';

const COMPONENTS = [
  DyformdemoFormlistComponent];
const COMPONENTS_NOROUNT = [
  DyformdemoCreateComponent,
  DyformdemoEditComponent];

@NgModule({
  imports: [
    SharedModule,
    DyformdemoRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DyformdemoModule { }
