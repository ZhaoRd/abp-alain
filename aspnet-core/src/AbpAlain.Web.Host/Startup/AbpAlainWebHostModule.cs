using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpAlain.Configuration;

namespace AbpAlain.Web.Host.Startup
{
    [DependsOn(
       typeof(AbpAlainWebCoreModule))]
    public class AbpAlainWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpAlainWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpAlainWebHostModule).GetAssembly());
        }
    }
}
