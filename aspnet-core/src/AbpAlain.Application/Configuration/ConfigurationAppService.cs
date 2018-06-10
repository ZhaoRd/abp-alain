using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using AbpAlain.Configuration.Dto;

namespace AbpAlain.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AbpAlainAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
