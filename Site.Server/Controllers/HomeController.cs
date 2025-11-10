using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Site.Server.Models;
using Site.Server.Options;
using Site.Server.Repositories;

namespace Site.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IImageRepository _imageRepository = null;
        private readonly IOptionsSnapshot<AppOptions> _options;
        private readonly IMemoryCache _memoryCache;
        public HomeController(IImageRepository imageRepository,
                              IOptionsSnapshot<AppOptions> options,
                              IMemoryCache memoryCache)
        {
            _imageRepository = imageRepository;
            _options = options;
            _memoryCache = memoryCache;
        }


        [HttpGet]
        [Route("/Images/{whichImage:alpha?}")]
        public async Task<IActionResult> Images(string? whichImage)
        {

            string? layout = null;
            layout = (whichImage == null) ? _options.Value?.Layout : whichImage;
            List<ImageModel> imageData;
            try
            {
                imageData = (_imageRepository.GetImages(layout).Result).ToList();
            }
            catch
            {
                return BadRequest(new { message = "Images couldn't be retrieved" });
            }
            return Json(imageData.ToArray());
        }


        [HttpGet]
        [Route("/Product")]
        public async Task<JsonResult> Product(string title, string category)
        {
            var imageData = await _imageRepository.GetImages(category);
            var smallerTitle = title.Substring(0, title.Length - 4);
            var firstImage = imageData.Where(x => x.Title.Contains(smallerTitle)).First<ImageModel>();
            return Json(firstImage);
        }

    }
}
