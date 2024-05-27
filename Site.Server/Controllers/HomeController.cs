using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Site.Server.Options;
using Site.Server.Repositories;

namespace Site.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IImageRepository _imageRepository = null;
        private readonly IOptionsSnapshot<AppOptions> _options;
        public HomeController(IImageRepository imageRepository,
                              IOptionsSnapshot<AppOptions> options)
        {
            _imageRepository = imageRepository;
            _options = options;
        }

        [HttpGet]
        [Route("/Images/{whichImage:alpha?}")]
        public async Task<JsonResult> Images(string? whichImage)
        {

            string? layout = null;
            layout = (whichImage == null) ? _options.Value?.Layout : whichImage;
            var imageData = await _imageRepository.GetImages(layout);
            return Json(imageData);
        }

    }
}
