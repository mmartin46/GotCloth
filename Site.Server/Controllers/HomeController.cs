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
        public async Task<IActionResult> Product(string title, string category)
        {
            try
            {
                if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(category))
                {
                    return BadRequest(new { message = "Title and category are required" });
                }

                ImageModel[] imageData;
                try
                {
                    imageData = await _imageRepository.GetImages(category);
                }
                catch (Exception apiEx)
                {
                    return StatusCode(500, new { message = $"Failed to retrieve images from API: {apiEx.Message}" });
                }
                
                if (imageData == null || imageData.Length == 0)
                {
                    return BadRequest(new { message = "No images found for the specified category" });
                }

                // Only substring if title is longer than 4 characters
                string smallerTitle = title.Length > 4 ? title.Substring(0, title.Length - 4) : title;
                
                var firstImage = imageData.Where(x => x != null && x.Title != null && x.Title.Contains(smallerTitle)).FirstOrDefault();
                
                if (firstImage == null)
                {
                    // Return first image if no match found
                    firstImage = imageData.Where(x => x != null).FirstOrDefault();
                    if (firstImage == null)
                    {
                        return BadRequest(new { message = "No valid images available" });
                    }
                }
                
                return Json(firstImage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving product: {ex.Message}", stackTrace = ex.StackTrace });
            }
        }

    }
}
