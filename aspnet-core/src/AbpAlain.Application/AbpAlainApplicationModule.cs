using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpAlain.Authorization;

namespace AbpAlain
{
    [DependsOn(
        typeof(AbpAlainCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AbpAlainApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            
            Configuration.Authorization.Providers.Add<AbpAlainAuthorizationProvider>();

            
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AbpAlainApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
