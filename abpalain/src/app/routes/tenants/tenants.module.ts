import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsListComponent } from './list/list.component';

const COMPONENTS = [
  TenantsListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    TenantsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TenantsModule { }
