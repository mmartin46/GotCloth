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
            string[] names = { "jeans", "shirts", "shoes" };


            foreach (string name in names)
            {
                ImageModel[] images = await _imageRepository.GetImages(name);
                allImages.Add(name, images);
            }
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

        public async Task AddToCart(string username, string title)
        {
            await InitializeImageDictonary();
            var productsFromDb = await _context.Carts.ToListAsync();

            if (allImages != null)
            {
                foreach (var entry in allImages)
                {
                    ImageModel? match = entry.Value.Where(x => x.Title.Contains(title)).ToList().FirstOrDefault();
                    if (match != null)
                    {
                        Products products = new Products()
                        {
                            Username = username,
                            Title = match.Title,
                            Link = match.Link
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
