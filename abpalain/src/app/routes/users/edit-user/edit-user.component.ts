import { Component, OnInit, ViewChild,Injector, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';

import { UserServiceProxy, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from 'lodash';

@Component({
  selector: 'users-edit-user',
  templateUrl: './edit-user.component.html',
})
export class UsersEditUserComponent extends AppComponentBase implements OnInit {

  user: UserDto = null;
  roles: RoleDto[] = null;
  saving: boolean = false;

  checkOptionsOne = [];

  @Input()
  userId:number = null;

    constructor(injector: Injector,
      private _userService: UserServiceProxy,
      private subject: NzModalRef,private http: _HttpClient, private modal: ModalHelper) {
        super(injector);
        this.user = new UserDto();
       }

    ngOnInit() {

      this._userService.getRoles()
            .subscribe((result) => {
                this.roles = result.items;
                this.initRole(this.roles);
            });

        this._userService.get(this.userId)
            .subscribe(
            (result) => {
                this.user = result;
                this.initRole(this.roles);
            });

     }


     initRole(roles: RoleDto[]): void {
      this.checkOptionsOne = _.map(roles, c => {
        return {
          label: c.displayName,
          value: c.normalizedName,
          checked:this.userInRole(c,this.user)
        };
      }
      );
    }
  

    userInRole(role: RoleDto, user: UserDto): boolean {
      if(user.roleNames == null){
        return false;
      };
      if (user.roleNames.indexOf(role.normalizedName) !== -1) {
          return true;
      }
      else {
          return false;
      }
  }

  

  
  /**
   * 保存操作
   */
  save(): void {

    this.saving = true;

    var roles = _.map( _.filter(this.checkOptionsOne,c=>c.checked),'value');
    
    this.user.roleNames = roles;

    this._userService.update(this.user)
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
