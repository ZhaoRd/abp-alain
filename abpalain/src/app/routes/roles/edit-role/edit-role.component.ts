import { Component, OnInit ,Input,Injector} from '@angular/core';
  import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
  import { _HttpClient } from '@delon/theme';
  import { RoleServiceProxy, RoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import * as _ from 'lodash';

  @Component({
    selector: 'roles-edit-role',
    templateUrl: './edit-role.component.html',
  })
  export class RolesEditRoleComponent extends AppComponentBase implements OnInit {
    

    @Input()
    roleId:number=null;

    permissions: ListResultDtoOfPermissionDto = null;
    role: RoleDto = null;

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
      this.role = new RoleDto();
      this.role.permissions = [];
      this.permissions = new ListResultDtoOfPermissionDto();
     }

    ngOnInit(): void {
      this._roleService.getAllPermissions()
            .subscribe((permissions: ListResultDtoOfPermissionDto) => {
                this.permissions = permissions;
                this.initPermissions(this.permissions);
            });


            this._roleService.get(this.roleId)
            .finally(() => {
            })
            .subscribe((result: RoleDto) => {
                this.role = result;
                this.initPermissions(this.permissions);
            });
     // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
    }

    initPermissions(permissions: ListResultDtoOfPermissionDto): void {
      this.checkOptionsOne = _.map(permissions.items, c => {
        return {
          label: c.displayName,
          value: c.name,
          checked:this.checkPermission(c.name)
        };
      }
      );
    }

    checkPermission(permissionName: string): boolean {
      if (this.role.permissions.indexOf(permissionName) != -1) {
          return true;
      }
      else {
          return false;
      }
  }


  
  save(): void {
    console.log(this.checkOptionsOne);
    const selected = _.filter(this.checkOptionsOne,c=>c.checked);
    console.log(selected);
    const permissions = _.map( selected,'value');
    
        this.role.permissions = permissions;
        console.log(this.role);
        this.saving = true;
        this._roleService.update(this.role)
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
