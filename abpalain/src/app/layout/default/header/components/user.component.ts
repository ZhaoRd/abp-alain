import { Component, Inject,OnInit,Injector } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="'/assets/images/user.png'" nzSize="small" class="mr-sm"></nz-avatar>
      {{shownLoginName}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent  extends AppComponentBase implements OnInit{

  shownLoginName: string = "";

  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {

    super(injector);

  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
}

  logout() {
    this._authService.logout();
  }
}
