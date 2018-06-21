import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
} from '@delon/auth';
import { environment } from '@env/environment';

import { AbpSessionService } from '@abp/session/abp-session.service';

import { LoginService } from './login.service';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent extends AppComponentBase implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  submitting: boolean = false;

  constructor(
    injector: Injector,
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    public loginService: LoginService,
    private _sessionService: AbpSessionService
  ) {
    super(injector);
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
  }

  // region: get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  
  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
        return false;
    }

    return true;
  }

  /**
   * 登录
   */
  submit() {
    this.submitting = true;
    this.loginService.authenticate(
        () => this.submitting = false
    );
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
