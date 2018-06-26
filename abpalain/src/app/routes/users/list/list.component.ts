import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { AppComponentBase } from '@shared/app-component-base';

import { PageInfo } from '@shared/paging/PageInfo';
import { AppModalService } from '@shared/modal/appModalService';

import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';

import { UsersCreateUserComponent } from './../create-user/create-user.component';
import { UsersEditUserComponent } from './../edit-user/edit-user.component';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
})
export class UsersListComponent extends AppComponentBase implements OnInit {

  pageInfo: PageInfo;

  list = [];
  loading = false;

  constructor(
    injector: Injector,
    private _appModalService: AppModalService,
    private http: _HttpClient, private modal: ModalHelper,
    private _userService: UserServiceProxy) {
    super(injector);

    this.pageInfo = new PageInfo();
  }

  ngOnInit() {
    this.load();
  }

  add() {
    this._appModalService.show(UsersCreateUserComponent).subscribe(res => {
      this.load();
    });
  }

  load(pi?: number) {
    if (typeof pi !== 'undefined') {
      this.pageInfo.pageIndex = pi || 1;
    }
    this.userList();
  }

  userList() {
    const skipCount = this.pageInfo.skipCount;
    const maxResultCount = this.pageInfo.maxResultCount;
    this.loading = true;
    this._userService.getAll(skipCount, maxResultCount)
      .finally(() => {
        this.loading = false;
      })
      .subscribe((result: PagedResultDtoOfUserDto) => {
        console.log(result);
        this.list = result.items;
        this.pageInfo.total = result.totalCount;
      });
  }

  edit(id: number): void {
    this._appModalService.show(UsersEditUserComponent, {
      userId: id
    }).subscribe(res => {
      this.load();
    });
  }

  delete(user: UserDto): void {
    abp.message.confirm(
      "Delete user '" + user.fullName + "'?"
    ).then((result: boolean) => {
      console.log(result);
      if (result) {
        this._userService.delete(user.id)
          .finally(() => {
            abp.notify.info("Deleted User: " + user.fullName);
            this.load();
          })
          .subscribe(() => { });
      }
    });
  }

}
