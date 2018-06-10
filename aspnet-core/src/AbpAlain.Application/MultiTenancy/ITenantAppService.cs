using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpAlain.MultiTenancy.Dto;

namespace AbpAlain.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
