using Site.Server.Models;
using Newtonsoft.Json;
using Site.Server.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Site.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {
        // Google Custom Search API key - set via environment variable GOOGLE_API_KEY
        private readonly string[] keys;
        private readonly IMemoryCache _memoryCache;

        public ImageRepository(IMemoryCache memoryCache, IConfiguration configuration)
        {
            _memoryCache = memoryCache;
            
            // Get API key from environment variable or configuration
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY") 
                        ?? configuration["GoogleApi:Key"];
            
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Google API key not found. Set GOOGLE_API_KEY environment variable or configure GoogleApi:Key in appsettings.");
            }
            
            keys = new[] { apiKey };
        }

        public async Task<ImageModel[]> GetImages(string nameToSearch = "pants", int keyIndex = 0)
        {
            string cacheKey = $"images_{nameToSearch}_{keyIndex}";
            if (_memoryCache.TryGetValue(cacheKey, out ImageModel[] cachedImages))
            {
                return cachedImages;
            }

            HttpClient client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(10); // Set 10 second timeout

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
            catch (TaskCanceledException)
            {
                // Timeout occurred
                return new ImageModel[0];
            }
            catch (HttpRequestException)
            {
                // Network or HTTP error
                return new ImageModel[0];
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
