import { Component,Injector } from '@angular/core';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent extends AppComponentBase {

  versionText: string;
  currentYear: number;

  public constructor(
    injector: Injector
  ) {
    super(injector);

    this.currentYear = new Date().getFullYear();
    this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
  }

  showTenantChange(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];
}
