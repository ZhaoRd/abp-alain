using Microsoft.AspNetCore.Antiforgery;
using AbpAlain.Controllers;

namespace AbpAlain.Web.Host.Controllers
{
    public class AntiForgeryController : AbpAlainControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
