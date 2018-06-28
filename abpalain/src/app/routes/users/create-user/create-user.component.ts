import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';

import { UserServiceProxy, CreateUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from 'lodash';

@Component({
  selector: 'users-create-user',
  templateUrl: './create-user.component.html',
})
export class UsersCreateUserComponent extends AppComponentBase implements OnInit {

  user: CreateUserDto = null;
  roles: RoleDto[] = null;
  saving: boolean = false;

  checkOptionsOne:Array<any> = [];

  constructor(injector: Injector,
    private _userService: UserServiceProxy,
    private subject: NzModalRef,
    private http: _HttpClient, private modal: ModalHelper) {
    super(injector);
  }

  ngOnInit() {

    this._userService.getRoles()
      .subscribe((result) => {
        this.roles = result.items;
        this.initRole(this.roles);
      });

    this.user = new CreateUserDto();
    this.user.init({ isActive: true });

    this.checkOptionsOne = [
      { label: 'Apple', value: 'Apple', checked: true },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ];

  }

  initRole(roles: RoleDto[]): void {
    this.checkOptionsOne = _.map(roles, c => {
      return {
        label: c.displayName,
        value: c.normalizedName
      };
    }
    );
  }

  /**
   * 保存操作
   */
  save(): void {

    this.saving = true;

    const selectRoles = _.filter(this.checkOptionsOne,c=>c.checked);
    const roles = _.map( selectRoles,'value');
   

    this.user.roleNames = roles;

    this._userService.create(this.user)
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
