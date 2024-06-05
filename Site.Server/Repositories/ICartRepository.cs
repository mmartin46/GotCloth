using Site.Server.Models;

namespace Site.Server.Repositories
{
    public interface ICartRepository
    {
        Task AddToCart(string username, string title);
        Task<List<ProductModel>> GetAllProducts();
    }
}