using System.Threading.Tasks;
using Abp.Application.Services;
using AbpAlain.Sessions.Dto;

namespace AbpAlain.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
