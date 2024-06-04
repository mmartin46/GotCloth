using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;

namespace Site.Server.Repositories
{
    public class CartRepository
    {
        private readonly CartDatabaseContext _context = null;
        public CartRepository(CartDatabaseContext context)
        {
            _context = context;
        }

        // NOT TESTED
        public async Task<List<ProductModel>> GetAllProducts()
        {
            var productsFromDb = await _context.Carts.ToListAsync();
            List<ProductModel> models = new List<ProductModel>();

            foreach (Products product in productsFromDb)
            {
                models.Add(
                    new ProductModel
                    {
                        Title = product.Title,
                        Link = product.Link,
                        Price = product.Price,
                        Username = product.Username
                    });
            }
            return models;
        }
    }
}
