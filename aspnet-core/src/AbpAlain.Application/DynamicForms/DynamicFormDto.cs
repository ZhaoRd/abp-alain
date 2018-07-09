namespace AbpAlain.DynamicForms
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;
    using System.Reflection.Metadata.Ecma335;
    using System.Runtime.CompilerServices;
    using System.Threading.Tasks;

    using Abp.Application.Services;
    using Abp.Extensions;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    using NJsonSchema;
    using NJsonSchema.Annotations;
    using NJsonSchema.Generation;

    public interface IDynamicFormAppService : IApplicationService
    {
        Task<GetDynamicFormForEditDto> GetDynamicFormForEdit();
    }

    public class DynamicFormAppService : AbpAlainAppServiceBase, IDynamicFormAppService
    {
        public async Task<GetDynamicFormForEditDto> GetDynamicFormForEdit()
        {
            var result = new GetDynamicFormForEditDto();
            
            result.DynamicForm = new DynamicFormDto();
            result.Schema = await JsonSchema4.FromTypeAsync<DynamicFormDto>(
                                  new JsonSchemaGeneratorSettings()
                                      {
                                          SerializerSettings = new JsonSerializerSettings()
                                                                   {
                                                                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                                                                   }
                                                            
                                      });

            return await Task.FromResult(result);
            //throw new System.NotImplementedException();
        }
    }
    
    public class GetDynamicFormForEditDto
    {
        public DynamicFormDto DynamicForm { get; set; }
        
        public JsonSchema4 Schema { get; set; }
    }

    public class DynamicFormDto
    {
        [JsonSchemaType(typeof(string),IsNullable = false)]
        [JsonSchemaExtensionData("title","姓名")]
        [Required]
        [MaxLength(15)]
        public string Name { get; set; }

        [JsonSchemaExtensionData("title", "年龄")]
        [Range(0,300)]
        public int Age { get; set; }

        [JsonSchemaExtensionData("title", "薪资")]
        public decimal Wages { get; set; }

        [JsonSchemaExtensionData("title", "性别")]
        public Gender Gender { get; set; }
    }

    public enum Gender
    {
        None,
        M,
        F
    }
    
}