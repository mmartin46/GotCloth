using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;
using Site.Server.Repositories;

namespace Site.Server.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly CartDatabaseContext _context = null;
        private readonly IImageRepository _imageRepository = null;
        private Dictionary<string, ImageModel[]> allImages = null;
        public CartRepository(CartDatabaseContext context, IImageRepository imageRepository)
        {
            _context = context;
            _imageRepository = imageRepository;
        }

        private async Task InitializeImageDictonary()
        {
            allImages = new Dictionary<string, ImageModel[]>();
            string[] names = { "pants", "shirt", "shoe", "shoes" };


            foreach (string name in names)
            {
                ImageModel[] images = await _imageRepository.GetImages(name);
                allImages.Add(name, images);
            }
        }

        public List<ProductModel> GetCartByUsername(string username)
        {
           List<ProductModel> productsByUsername = GetAllProducts().Result.Where(x => x.Username == username).ToList();
           return productsByUsername;
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

        public async Task AddToCart(CartItemModel cartItem)
        {
            await InitializeImageDictonary();
            var productsFromDb = await _context.Carts.ToListAsync();

            if (allImages != null)
            {
                foreach (var entry in allImages)
                {
                    ImageModel? match = entry.Value.Where(x => x.Title.Contains(cartItem.Title.Substring(0, 5))).ToList().FirstOrDefault();
                    if (match != null)
                    {
                        Products products = new Products()
                        {
                            Username = cartItem.Username,
                            Title = match.Title,
                            Link = match.Link,
                            Price = 10.00
                        };
                        await _context.Carts.AddAsync(products);
                        await _context.SaveChangesAsync();
                        break;
                    }
                }
            }
        }
    }
}
