using Site.Server.Models;
using Newtonsoft.Json;
using Site.Server.Responses;
using Microsoft.AspNetCore.Mvc;

namespace Site.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {

        public async Task<ImageModel[]> GetImages(string nameToSearch = "jeans")
        {
            HttpClient client = new HttpClient();

            HttpResponseMessage responseMessage = await client.GetAsync($"https://www.googleapis.com/customsearch/v1?key=AIzaSyA8d3a43sQt5Uoz6u4IaWyppCdOD8NHrXY&cx=6592259b67dd34e0b&q={nameToSearch}&searchType=image");
            if (responseMessage.IsSuccessStatusCode)
            {
                var data = await responseMessage.Content.ReadAsStringAsync();
                var imageData = JsonConvert.DeserializeObject<ImageApiResponse>(data);
                var items = imageData.Items;
                return items;
            }

            return null;
        }
    }
}
