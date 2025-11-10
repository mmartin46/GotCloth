using Site.Server.Models;

namespace Site.Server.Repositories
{
    public interface IImageRepository
    {
        Task<ImageModel[]> GetImages(string nameToSearch = "jeans", int keyIndex = 0);
    }
}