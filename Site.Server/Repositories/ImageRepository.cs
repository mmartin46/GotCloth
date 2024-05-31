using Site.Server.Models;
using Newtonsoft.Json;
using Site.Server.Responses;
using Microsoft.AspNetCore.Mvc;

namespace Site.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly string[] keys = { "AIzaSyDBjFaZpOwX2m-0z8JulXEi7OGEMVR0EpQ", "AIzaSyA8d3a43sQt5Uoz6u4IaWyppCdOD8NHrXY" };

        public async Task<ImageModel[]> GetImages(string nameToSearch = "pants", int keyIndex = 0)
        {
            HttpClient client = new HttpClient();

            HttpResponseMessage responseMessage = await client.GetAsync($"https://www.googleapis.com/customsearch/v1?key={keys[2]}&cx=6592259b67dd34e0b&q={nameToSearch}&searchType=image");
            if (responseMessage.IsSuccessStatusCode)
            {
                var data = await responseMessage.Content.ReadAsStringAsync();
                var imageData = JsonConvert.DeserializeObject<ImageApiResponse>(data);
                var items = imageData.Items;
                return items;
            }

            if (keyIndex < keys.Length)
            {
                return await GetImages(nameToSearch, ++keyIndex);
            }

            return null;
        }
    }
}
