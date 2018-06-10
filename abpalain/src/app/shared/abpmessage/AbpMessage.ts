import { Injectable } from '@angular/core';
import { NzModalService ,NzNotificationService ,NzMessageService } from 'ng-zorro-antd';
import { reverse } from 'dns';
import { reject } from 'q';

@Injectable()
export class AbpMessage {


    constructor(private modalService: NzModalService,
    private messageService:NzMessageService) {
    }

    init(){
        
        this.initMessage();
        this.initNotify();
    }

    initNotify(){
        abp.notify.info=(message: string, title?: string)=>{
            this.messageService.create('info', message);
        }
        abp.notify.success=(message: string, title?: string)=>{
            this.messageService.create('success', message);
        }
        abp.notify.warn=(message: string, title?: string)=>{
            this.messageService.create('warn', message);
        }
        abp.notify.error=(message: string, title?: string)=>{
            this.messageService.create('error', message);
        }
    }

    initMessage(){
        abp.message.info = (message, title)=>{
            var dispalyTitle = title==null?message:title;
            this.modalService.info({
                nzTitle: dispalyTitle,
                nzContent: message,
                nzOnOk: () => console.log('Info OK')
              });
          };

          abp.message.success = (message, title)=>{
            var dispalyTitle = title==null?message:title;
            this.modalService.success({
                nzTitle: dispalyTitle,
                nzContent: message
              });
          };

          abp.message.warn = (message, title)=>{
            var dispalyTitle = title==null?message:title;
            this.modalService.warning({
                nzTitle: dispalyTitle,
                nzContent: message
              });
          };

          abp.message.error = (message, title)=>{
            var dispalyTitle = title==null?message:title;
            this.modalService.error({
                nzTitle: dispalyTitle,
                nzContent: message
              });
          };

          abp.message.confirm=(message)=>{

            return new Promise<boolean>((reverse,reject)=>{

                this.modalService.confirm({
                    // nzTitle: '<i>Do you Want to delete these items?</i>',
                     nzContent: message,
                     nzOnOk: () => reverse(true),
                     nzOnCancel: () => reverse(false)
                   });

            })

          }
        
    }

}