using Site.Server.Models;
using Newtonsoft.Json;
using Site.Server.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Site.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly string[] keys = { "AIzaSyDBjFaZpOwX2m-0z8JulXEi7OGEMVR0EpQ" };
        private readonly IMemoryCache _memoryCache;

        public ImageRepository(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public async Task<ImageModel[]> GetImages(string nameToSearch = "pants", int keyIndex = 0)
        {
            string cacheKey = $"images_{nameToSearch}_{keyIndex}";
            if (_memoryCache.TryGetValue(cacheKey, out ImageModel[] cachedImages))
            {
                return cachedImages;
            }

            HttpClient client = new HttpClient();

            try
            {
                HttpResponseMessage responseMessage = await client.GetAsync($"https://www.googleapis.com/customsearch/v1?key={keys[keyIndex]}&cx=6592259b67dd34e0b&q={nameToSearch}&searchType=image");
                if (responseMessage.IsSuccessStatusCode)
                {
                    var data = await responseMessage.Content.ReadAsStringAsync();
                    var imageData = JsonConvert.DeserializeObject<ImageApiResponse>(data);
                    var items = imageData.Items ?? new ImageModel[0];
                    
                    // Cache the results
                    var cacheOptions = new MemoryCacheEntryOptions()
                        .SetSize(500 * 1024 * 1024)
                        .SetAbsoluteExpiration(TimeSpan.FromHours(2));

                    _memoryCache.Set(cacheKey, items, cacheOptions);
                    
                    return items;
                }
                else
                { 
                    // If the current key fails, try the next one (if theres more)
                    if (keyIndex + 1 < keys.Length)
                    {
                        return await GetImages(nameToSearch, ++keyIndex);
                    }
                }
            }
            catch (Exception)
            {
                // If the current key fails, try the next one (if theres more)
                if (keyIndex + 1 < keys.Length)
                {
                    return await GetImages(nameToSearch, ++keyIndex);
                }            
            }
            finally
            {
                client.Dispose();
            }
            return new ImageModel[0];
        }
    }
}
