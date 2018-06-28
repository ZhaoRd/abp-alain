import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';


import { AppComponentBase } from '@shared/app-component-base';

import { PageInfo } from '@shared/paging/PageInfo';
import { AppModalService } from '@shared/modal/appModalService';

import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from "@shared/service-proxies/service-proxies";

import { RolesCreateRoleComponent } from "./../create-role/create-role.component";
import { RolesEditRoleComponent } from "./../edit-role/edit-role.component";

@Component({
  selector: 'roles-list',
  templateUrl: './list.component.html',
})
export class RolesListComponent extends AppComponentBase implements OnInit {
  pageInfo: PageInfo;

  list = [];
  loading = false;

  constructor(injector: Injector,
    private _appModalService: AppModalService, private http: _HttpClient, private modal: ModalHelper
    , private _roleService: RoleServiceProxy) {
    super(injector);
    this.pageInfo = new PageInfo();
  }

  ngOnInit() {
    console.log("123");
    this.load();
  }


  load(pi?: number) {
    if (typeof pi !== 'undefined') {
      this.pageInfo.pageIndex = pi || 1;
    }
    this.roleList();
  }

  edit(id: number): void {
    this._appModalService.show(RolesEditRoleComponent, {
      roleId: id
    }).subscribe(res => {
      this.load();
    });
  }

  roleList() {
    const skipCount = this.pageInfo.skipCount;
    const maxResultCount = this.pageInfo.maxResultCount;
    this.loading = true;
    this._roleService.getAll(skipCount, maxResultCount)
      .finally(() => {
        this.loading = false;
      })
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        console.log(result);
        this.list = result.items;
        this.pageInfo.total = result.totalCount;
      });
  }

  add() {
     this._appModalService.show(RolesCreateRoleComponent)
          .subscribe((res)=>{
            this.load();
          });
  }

  delete(role: RoleDto): void {
    abp.message.confirm(
      "Remove Users from Role and delete Role '"+ role.displayName +"'?"
    ).then((result: boolean) => {
      console.log(result);
      if (result) {
        this._roleService.delete(role.id)
          .finally(() => {
            abp.notify.info("Deleted Role: " + role.displayName );
            this.load();
          })
          .subscribe(() => { });
      }
    });
  }

}
