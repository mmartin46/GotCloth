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

        public async Task<JsonResult> Index()
        {
            var imageData = await _imageRepository.GetImages();
            return Json(imageData);
        }

    }
}
