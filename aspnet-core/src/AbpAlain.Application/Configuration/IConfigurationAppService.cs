using System.Threading.Tasks;
using AbpAlain.Configuration.Dto;

namespace AbpAlain.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
