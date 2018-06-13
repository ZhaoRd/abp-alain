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
// import { ModalDirective } from 'ngx-bootstrap';

import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'passport-tenant-change-modal',
  templateUrl: './tenant-change-modal.component.html',
})
export class TenantChangeModalComponent extends AppComponentBase
  implements AfterViewInit {
  /*
    @ViewChild('tenantChangeModal') modal: ModalDirective;
    
    @ViewChild('modalContent') modalContent: ElementRef;
    */
  @ViewChild('tenancyNameInput') tenancyNameInput: ElementRef;

  // tenancyName: string = '';
  active = false;
  saving = false;

  @Input() tenancyName = '';

  constructor(
    private _accountService: AccountServiceProxy,
    private modal: NzModalService,
    private subject: NzModalRef,
    injector: Injector,
  ) {
    super(injector);
  }

  show(tenancyName: string): void {
    this.tenancyName = tenancyName;
    this.active = true;
    // this.modal.show();
  }

  /*
    onShown(): void {
        this.tenancyNameInput.nativeElement.focus().select();
        // $(this.tenancyNameInput.nativeElement).focus().select();
    }
    */
  ngAfterViewInit(): void {
    this.tenancyNameInput.nativeElement.focus().select();
    // throw new Error("Method not implemented.");
  }

  save(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.close();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this.saving = true;
    this._accountService
      .isTenantAvailable(input)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(result => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            this.close();
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound: // NotFound
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName),
            );
            break;
        }
      });
  }

  close(): void {
    // this.subject.destroy();
    // this.subject.close();
    this.subject.destroy();
    /*
        this.active = false;
        this.modal.hide();
        */
  }
}
