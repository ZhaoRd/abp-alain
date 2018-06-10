using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using AbpAlain.Configuration;
using AbpAlain.Web;

namespace AbpAlain.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class AbpAlainDbContextFactory : IDesignTimeDbContextFactory<AbpAlainDbContext>
    {
        public AbpAlainDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AbpAlainDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            AbpAlainDbContextConfigurer.Configure(builder, configuration.GetConnectionString(AbpAlainConsts.ConnectionStringName));

            return new AbpAlainDbContext(builder.Options);
        }
    }
}
