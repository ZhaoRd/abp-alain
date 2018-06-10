using Abp.Authorization;
using AbpAlain.Authorization.Roles;
using AbpAlain.Authorization.Users;

namespace AbpAlain.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
