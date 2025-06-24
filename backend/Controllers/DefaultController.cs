using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("/")] // Đây là root path: http://localhost:5000/
    public class DefaultController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Content("Xin chào tất cả mọi người", "text/plain");
        }
    }
}