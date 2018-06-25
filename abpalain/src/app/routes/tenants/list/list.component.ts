import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { AppComponentBase } from '@shared/app-component-base';

import { PageInfo } from '@shared/paging/PageInfo';
import { AppModalService } from '@shared/modal/appModalService';

import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';

import { CreateTenantModalComponent } from './create-tenant-modal.component';
import { EditTenantModalComponent } from './edit-tenant-modal.component';

@Component({
  selector: 'tenants-list',
  templateUrl: './list.component.html',
})
export class TenantsListComponent extends AppComponentBase implements OnInit {


  pageInfo: PageInfo;

  list = [];
  loading = false;

  constructor(
    injector: Injector,
    private http: _HttpClient,
    private modal: ModalHelper,
    private _tenantService: TenantServiceProxy,
    private _appModalService: AppModalService) {
    super(injector);

    this.pageInfo = new PageInfo();

  }

  load(pi?: number) {
    if (typeof pi !== 'undefined') {
      this.pageInfo.pageIndex = pi || 1;
    }
    this.getTenants();
  }

  getTenants() {
    const skipCount = this.pageInfo.skipCount;
    const maxResultCount = this.pageInfo.maxResultCount;

    this.loading = true;
    this._tenantService.getAll(skipCount, maxResultCount)
      .finally(() => {
        this.loading = false;
      })
      .subscribe((result: PagedResultDtoOfTenantDto) => {
        abp.log.debug(result);
        this.list = result.items;
        this.pageInfo.total = result.totalCount;
      });


  }

  ngOnInit() {
    this.getTenants();

  }

  add() {

    this._appModalService.show(CreateTenantModalComponent, { tenantId: null }).subscribe((res) => {

      this.load();
    });
    // this.modal.open(TenantCreateOrUpdateModalComponent,{tenantId:null});
  }

  edit(tenantId) {
    this._appModalService.show(EditTenantModalComponent, { tenantId: tenantId })
      .subscribe(res => {
        this.load(this.pageInfo.pageIndex);
      });
  }

  delete(tenant: TenantDto): void {
    abp.message.confirm(
      "Delete tenant '" + tenant.name + "'?"
    ).then((result: boolean) => {
      console.log(result);
      if (result) {
        this._tenantService.delete(tenant.id)
          .finally(() => {
            abp.notify.info("Deleted tenant: " + tenant.name);
            this.load();
          })
          .subscribe(() => { });
      }
    });
  }

}
