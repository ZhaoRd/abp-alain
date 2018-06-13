import { Injectable, Type } from '@angular/core';

import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AppModalService {
  constructor(private _modal: NzModalService) {}

  show(content: string | Type<any>, componentParams?: object) {
    const options = {
      content: content,
      footer: false,
      nzComponentParams: componentParams,
    };

    this._modal.create(options);

    return this._modal.afterAllClose;
  }
}
