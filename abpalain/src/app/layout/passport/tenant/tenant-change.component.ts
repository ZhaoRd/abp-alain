import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { TenantChangeModalComponent } from './tenant-change-modal.component';
import { AppComponentBase } from '@shared/app-component-base';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import { AppModalService } from '@shared/modal/appModalService';

@Component({
  selector: 'passport-tenant-change',
  templateUrl: './tenant-change.component.html',
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
  // @ViewChild('tenantChangeModal') tenantChangeModal: TenantChangeModalComponent;

  tenancyName: string;
  name: string;
  options = {};

  constructor(
    injector: Injector,
    private modalService: NzModalService,
    private _accountService: AccountServiceProxy,
    private _appModalService: AppModalService,
  ) {
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

    /*
        this.options = {
            content: TenantChangeModalComponent,
            footer: false,
            componentParams: {
                tenancyName: this.tenancyName
            }
        };

        const modal = this.modalService.create(this.options);

        modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));
        */
  }
}
