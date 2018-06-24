import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { AppComponentBase } from '@shared/app-component-base';

import { PageInfo } from '@shared/paging/PageInfo';

import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'tenants-list',
  templateUrl: './list.component.html',
})
export class TenantsListComponent extends AppComponentBase implements OnInit {


  pageInfo:PageInfo;

  list = [];
  loading = false;

  constructor(
    injector: Injector,
    private http: _HttpClient,
    private modal: ModalHelper,
    private _tenantService: TenantServiceProxy) {
    super(injector);

    this.pageInfo = new PageInfo();

  }

  load(pi?: number) {
    if (typeof pi !== 'undefined') {
      this.pageInfo.pageIndex = pi || 1;
      this.getTenants();
      return;
    }
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
        this.list = result.items;
        this.pageInfo.total = result.totalCount;
      });


  }

  ngOnInit() {
    this.getTenants();

  }

  add() {

  }

}
