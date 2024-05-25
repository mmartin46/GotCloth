using Microsoft.AspNetCore.Mvc;
using Site.Server.Repositories;

namespace Site.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IImageRepository _imageRepository = null;
        public HomeController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet]
        [Route("/Images")]
        public async Task<JsonResult> Images()
        {
            var imageData = await _imageRepository.GetImages();
            return Json(imageData);
        }

    }
}
