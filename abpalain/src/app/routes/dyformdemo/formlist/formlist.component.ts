import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { DyformdemoCreateComponent } from './create/create.component';

@Component({
  selector: 'dyformdemo-formlist',
  templateUrl: './formlist.component.html',
})
export class DyformdemoFormlistComponent implements OnInit {

    params: any = {};
    // url = `/user`;
    searchSchema: SFSchema = {
      properties: {
        no: {
          type: 'string',
          title: '编号'
        }
      }
    };

    //@ViewChild('st') st: SimpleTableComponent;
    /*
    columns: SimpleTableColumn[] = [
      { title: '编号', index: 'no' },
      { title: '调用次数', type: 'number', index: 'callNo' },
      { title: '头像', type: 'img', width: '50px', index: 'avatar' },
      { title: '时间', type: 'date', index: 'updatedAt' },
      {
        title: '',
        buttons: [
          // { text: '查看', click: (item: any) => `/form/${item.id}` },
          // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
        ]
      }
    ];
    */

    constructor(private http: _HttpClient, private modal: ModalHelper) { }

    ngOnInit() { }

    add() {
      this.modal
          .static(DyformdemoCreateComponent,{ i: { id: 0 } })
          .subscribe(() =>{
            
          });
      // this.modal
      //   .static(WareEditComponent, { i: { id: 0 } })
      //   .pipe(filter(w => w === true))
      //   .subscribe(() => this.st.reload());
    }

}
