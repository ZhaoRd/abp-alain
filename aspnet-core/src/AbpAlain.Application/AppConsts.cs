namespace AbpAlain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;
    using System.Resources;

    using Abp.Application.Services;
    using Abp.Dependency;
    using Abp.Localization;
    using Abp.Runtime.Validation.Interception;

    using Castle.Core;
    using Castle.Core.Logging;
    using Castle.DynamicProxy;
    using Castle.MicroKernel;

    public class AppConsts
    {
        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public const string DefaultPassPhrase = "gsKxGZ012HLL3MI5";
    }

    public class AbpAlainResourceManager
    {
        public static string GetStringKey(string name)
        {
            var localizationManager = IocManager.Instance.Resolve<ILocalizationManager>();
            return localizationManager.GetString(AbpAlainConsts.LocalizationSourceName, name);
        }

        public static string UserNameNotNull {
            get
            {
                return GetStringKey("UserNameNotNull");
            }
        }
    }

}
