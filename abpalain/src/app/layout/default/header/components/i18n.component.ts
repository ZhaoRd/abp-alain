import { Component, Inject,Injector,OnInit } from '@angular/core';
import {
  SettingsService,
  MenuService,
  TitleService,
  ALAIN_I18N_TOKEN,
} from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';

import { AppComponentBase } from '@shared/app-component-base';

import * as _ from 'lodash';

@Component({
  selector: 'header-i18n',
  template: `
  <nz-dropdown>
    <div nz-dropdown>
      <i class="anticon anticon-edit"></i>
      {{ 'language' | translate}}
      <i class="anticon anticon-down"></i>
    </div>
    <ul nz-menu>
    <li nz-menu-item *ngFor="let item of languages"
        [nzSelected]="item.name === currentLanguage.name"
        (click)="changeLanguage(item.name)">
        <i class="{{item.icon}}"></i>
        {{item.displayName}}
        </li>
      <!--
      <li nz-menu-item *ngFor="let item of langs"
        [nzSelected]="item.code === settings.layout.lang"
        (click)="change(item.code)">{{item.text}}</li>
        -->
    </ul>
  </nz-dropdown>
  `,
})
export class HeaderI18nComponent extends AppComponentBase implements OnInit{
  langs: any[];

  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;


  constructor(injector: Injector,
    public settings: SettingsService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
  ) {
    super(injector);
    this.langs = this.i18n.getLangs();
  }

  ngOnInit() {
    this.languages = _.filter(this.localization.languages, l => !l.isDisabled);
    this.currentLanguage = this.localization.currentLanguage;
  }

  change(lang: string) {
    this.i18n.use(lang);
    this.settings.setLayout('lang', lang);
  }

  /***
   * 切换多语言
   * 存储cookie值并刷新当前页面
   */
  changeLanguage(languageName: string): void {
    abp.utils.setCookieValue(
      'Abp.Localization.CultureName',
      languageName,
      new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
      abp.appPath,
    );

    location.reload();
  }

}
