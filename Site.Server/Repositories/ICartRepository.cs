using Site.Server.Models;

namespace Site.Server.Repositories
{
    public interface ICartRepository
    {
        Task AddToCart(CartItemModel cartItemModel);
        Task FilterCarts();
        Task<List<ProductModel>> GetAllProducts();
        List<ProductModel> GetCartByUsername(string username);
        Task UpdateCart(ProductModel cartItem);
    }
}