import { Component, OnInit,Injector } from '@angular/core';
  import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
  import { _HttpClient } from '@delon/theme';
  import { RoleServiceProxy, CreateRoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from 'lodash';

  @Component({
    selector: 'roles-create-role',
    templateUrl: './create-role.component.html',
  })
  export class RolesCreateRoleComponent extends AppComponentBase implements OnInit {
    permissions: ListResultDtoOfPermissionDto = null;
    role: CreateRoleDto = null;

    saving:boolean=false;

    checkOptionsOne:Array<any> = [];
    constructor(
      injector:Injector,
      private modal: NzModalRef,
      public msgSrv: NzMessageService,
      public http: _HttpClient,
      private _roleService:RoleServiceProxy
    ) { 
      super(injector);

      this.role = new CreateRoleDto();
      this.role.init({ isStatic: false });
      this.permissions = new ListResultDtoOfPermissionDto();
    }

    ngOnInit(): void {
      this._roleService.getAllPermissions()
      .subscribe((permissions: ListResultDtoOfPermissionDto) => {
          this.permissions = permissions;
          this.initPermissions(this.permissions);
      });
      // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
    }

    
  initPermissions(permissions: ListResultDtoOfPermissionDto): void {
    this.checkOptionsOne = _.map(permissions.items, c => {
      return {
        label: c.displayName,
        value: c.name,
        checked:true
      };
    }
    );
  }

  save(): void {
    
const selected = _.filter(this.checkOptionsOne,c=>c.checked);
const permissions = _.map( selected,'value');

    this.role.permissions = permissions;

    this.saving = true;
    this._roleService.create(this.role)
        .finally(() => { this.saving = false; })
        .subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        });
}


    close() {
      this.modal.destroy();
    }
  }
