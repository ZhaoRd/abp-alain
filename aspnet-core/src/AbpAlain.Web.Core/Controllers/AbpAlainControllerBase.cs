using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace AbpAlain.Controllers
{
    public abstract class AbpAlainControllerBase: AbpController
    {
        protected AbpAlainControllerBase()
        {
            LocalizationSourceName = AbpAlainConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
