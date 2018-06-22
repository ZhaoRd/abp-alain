import { Injectable, Type } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';

/**
 * 弹出框服务
 */
@Injectable()
export class AppModalService {
  constructor(private _modalService: NzModalService) {}

  /**
   * 显示弹出框
   * @param content 弹出框内容，可以是文本或组件
   * @param componentParams 弹出框参数，一般是json对象
   */
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
