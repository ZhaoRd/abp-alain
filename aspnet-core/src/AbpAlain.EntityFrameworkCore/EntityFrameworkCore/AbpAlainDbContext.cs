using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AbpAlain.Authorization.Roles;
using AbpAlain.Authorization.Users;
using AbpAlain.MultiTenancy;

namespace AbpAlain.EntityFrameworkCore
{
    public class AbpAlainDbContext : AbpZeroDbContext<Tenant, Role, User, AbpAlainDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public AbpAlainDbContext(DbContextOptions<AbpAlainDbContext> options)
            : base(options)
        {
        }
    }
}
