import { Component, OnInit, Injector } from '@angular/core';
import { TenantChangeModalComponent } from './tenant-change-modal.component';
import { AppComponentBase } from '@shared/app-component-base';

import { AppModalService } from '@shared/modal/appModalService';

@Component({
  selector: 'passport-tenant-change',
  templateUrl: './tenant-change.component.html',
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
  tenancyName: string;
  name: string;
  options = {};

  constructor(injector: Injector, private _appModalService: AppModalService) {
    super(injector);
  }

  ngOnInit() {
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
  }

  get isMultiTenancyEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  showChangeModal(): void {
    this._appModalService
      .show(TenantChangeModalComponent, {
        tenancyName: this.tenancyName,
      })
      .subscribe(result => {
        abp.log.debug({
          afterClose: result,
        });
      });
  }
}
