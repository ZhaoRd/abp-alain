using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpAlain.Configuration;

namespace AbpAlain.Web.Host.Startup
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    using Abp.AspNetCore.Mvc.Validation;
    using Abp.Dependency;
    using Abp.Localization;
    using Abp.Runtime.Validation;

    using Castle.Core;
    using Castle.Core.Logging;
    using Castle.DynamicProxy;
    using Castle.MicroKernel;

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

        public override void PreInitialize()
        {
            ValidationInterceptorRegistrar.Initialize(this.IocManager);

        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpAlainWebHostModule).GetAssembly());
        }
    }


    /// <summary>
    /// This interceptor is used intercept method calls for classes which's methods must be validated.
    /// </summary>
    public class MethodParameterValidatorInterceptor : IInterceptor
    {
        private readonly IIocResolver _iocResolver;

        private readonly ILocalizationManager _localizationManager;

        private readonly ILogger _logger;
        public MethodParameterValidatorInterceptor(IIocResolver iocResolver, ILocalizationManager localizationManager, ILogger logger)
        {
            _iocResolver = iocResolver;
            this._localizationManager = localizationManager;
            this._logger = logger;
        }

        public void Intercept(IInvocation invocation)
        {
            var method = invocation.Method.Name;

            if (method!= "ThrowValidationError")
            {
                invocation.Proceed();
                return;
            }

            try
            {
                invocation.Proceed();
            }
            catch (AbpValidationException e)
            {
                foreach (var validationResult in e.ValidationErrors)
                {
                    if (!validationResult.ErrorMessage.Contains("#"))
                    {
                        continue;
                    }

                    var errorStrings = validationResult.ErrorMessage.Split("#");
                    if (errorStrings.Length < 2)
                    {
                        continue;
                    }

                    if (errorStrings[0] != "ABP")
                    {
                        continue;
                    }

                    var key = errorStrings[1];
                    validationResult.ErrorMessage = this._localizationManager.GetString(
                        AbpAlainConsts.LocalizationSourceName,
                        key);
                }
                throw;
            }
        }
    }

    internal static class ValidationInterceptorRegistrar
    {
        public static void Initialize(IIocManager iocManager)
        {
            iocManager.IocContainer.Kernel.ComponentRegistered += Kernel_ComponentRegistered;
        }

        private static void Kernel_ComponentRegistered(string key, IHandler handler)
        {
            var name = handler.ComponentModel.Implementation.Name;

            if (name == "MvcActionInvocationValidator")
            {
                handler.ComponentModel.Interceptors.Add(new InterceptorReference(typeof(MethodParameterValidatorInterceptor)));
            }
        }
    }
}
