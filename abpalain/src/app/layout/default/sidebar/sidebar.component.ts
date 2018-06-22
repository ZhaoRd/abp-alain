import { Component,OnInit,Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends AppComponentBase implements OnInit{

  shownLoginName: string = "";

  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    public settings: SettingsService,
    public msgSrv: NzMessageService,
  ) {

    super(injector);

  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
    console.log(this.shownLoginName);
}

logout() {
  this._authService.logout();
}

}
