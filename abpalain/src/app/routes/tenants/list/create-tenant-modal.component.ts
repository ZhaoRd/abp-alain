import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { IsTenantAvailableInput } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';

import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';

import { TenantServiceProxy, CreateTenantDto, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-tenant-modal',
  templateUrl: './create-tenant-modal.component.html',
})
export class CreateTenantModalComponent extends AppComponentBase
  implements AfterViewInit, OnInit {

  active = false;
  saving = false;

  tenant: CreateTenantDto = null;

  /**
   * 租主名，使用@Input 传递参数
   */
  @Input() tenantId: number;

  constructor(
    private _tenantService: TenantServiceProxy,
    private _accountService: AccountServiceProxy,
    private modal: NzModalService,
    private subject: NzModalRef,
    injector: Injector,
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.tenant = new CreateTenantDto();
    this.tenant.init({ isActive: true });
  }

  /**
   * 保存操作
   */
  save(): void {

    this.saving = true;
    this._tenantService.create(this.tenant)
      .finally(() => {
        this.saving = false;
      })
      .subscribe((res) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
      });
  }

  /**
   * 关闭弹出窗
   */
  close(): void {
    this.subject.destroy();
  }
}
