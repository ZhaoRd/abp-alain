import { Component, OnInit,Injector } from '@angular/core';
  import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
  import { _HttpClient } from '@delon/theme';
  import { SFSchema,SFUISchema,SFSchemaEnumType } from '@delon/form';
  import { AppComponentBase } from '@shared/app-component-base';

  import { DynamicFormServiceProxy, GetDynamicFormForEditDto,JsonSchema4 } from '@shared/service-proxies/service-proxies';

  import * as _ from 'lodash';

  @Component({
    selector: 'dyformdemo-create',
    templateUrl: './create.component.html',
  })
  export class DyformdemoCreateComponent extends AppComponentBase implements OnInit {
    record: any = {};

    i: any;
    schema: SFSchema = {
      properties: {
        owner: { type: 'string', title: '姓名', maxLength: 15 },
        callNo: { type: 'number', title: '调用次数' },
        description: { type: 'string', title: '描述', maxLength: 140 },
      },
      required: ['owner'],
    };

    constructor(
      injector: Injector,
      private modal: NzModalRef,
      public msgSrv: NzMessageService,
      public http: _HttpClient,
      private _service:DynamicFormServiceProxy
    ) { 
      super(injector);

    }

    ngOnInit(): void {
      this._service.getDynamicFormForEdit().subscribe((res:GetDynamicFormForEditDto)=>{
          var j4ToSfSchema = this.j4ToSfSchema(res.schema);
          abp.log.debug(j4ToSfSchema);
          this.schema = j4ToSfSchema;

          this.i = res.dynamicForm;
      });
      // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
    }

    j4ToSfSchema(j4Schema:JsonSchema4):SFSchema{

      const sfSchema:SFSchema = {};

      const type = j4Schema.type;
      const typeValues = _.values(type);
      let sfSchemaType = this.toType(_.join(typeValues,''));
      sfSchema.type = sfSchemaType

      if(j4Schema.title){
        sfSchema.title= j4Schema.title;
      }

      if(j4Schema.required){
        sfSchema.required = j4Schema.required;
      }

      if(j4Schema.maxLength!=undefined){
        sfSchema.maxLength = j4Schema.maxLength;
      }

      if(j4Schema.minLength!=undefined){
        sfSchema.minLength = j4Schema.minLength;
      }

      if(j4Schema.maximum!=undefined){
        sfSchema.maximum = j4Schema.maximum;
      }

      if(j4Schema.minimum!=undefined){
        sfSchema.minimum = j4Schema.minimum;
      }

      if(_.keys(j4Schema.properties).length>0){
        const properties =  _.mapValues(j4Schema.properties,(value,key)=>{
          // 转换成 definitions中定义的内容
          if(value.type==undefined){
        
            const pkey = _.upperFirst(key);
            
            let def = j4Schema.definitions[pkey];
            console.log(def);
            let defSchema:SFSchema = {};

            if(def.enum){ // 转换枚举
              let enumTypes:SFSchemaEnumType[]=[];
              _.forEach(def.enum,(index,item)=>{
                let enumType:SFSchemaEnumType={};
                let label = def.xEnumNames[index];
                enumType.label = label;
                enumType.value = item;
                enumTypes.push(enumType);
              });
              defSchema.enum = enumTypes;

            }
            
            defSchema.type = this.toType(_.join( _.values(def.type),''));
            defSchema.title = def.title;
            return defSchema;
    
          }
    
         return this.j4ToSfSchema(value);  
         
        });

        sfSchema.properties = properties;

      }
      

      return sfSchema;

    }

    toType(type:string):'number' | 'integer' | 'string' | 'boolean' | 'object' | 'array'{
      
      if(type =='string'){
        return 'string';
      }
      else if(type =='integer'){
        return 'integer';
      }
      else if(type =='number'){
        return 'number';
      }
      else if(type =='boolean'){
        return 'boolean';
      }
      else if(type =='object'){
        return 'object';
      }
      return 'object';
    }

    close() {
      this.modal.destroy();
    }

    
    submit(value: any) {
      
    }

    save(value:any){
      
      console.log(value);
    }

  }
