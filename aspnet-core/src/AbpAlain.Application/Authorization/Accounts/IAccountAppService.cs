using System.Threading.Tasks;
using Abp.Application.Services;
using AbpAlain.Authorization.Accounts.Dto;

namespace AbpAlain.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
