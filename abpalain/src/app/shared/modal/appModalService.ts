import { Injectable, Type } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class AppModalService {
  constructor(private _modalService: NzModalService) {}

  show(content: string | Type<any>, componentParams?: object) {
    const options = {
      nzContent: content,
      nzFooter: null,
      nzComponentParams: componentParams,
    };

    const modal = this._modalService.create(options);

    return modal.afterClose;
  }
}
