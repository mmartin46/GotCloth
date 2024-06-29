using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;
using Site.Server.Repositories;

namespace Site.Server.Repositories
{
    public class CartRepository : ICartRepository
    {
        private CartDatabaseContext? _context = null;
        private readonly IImageRepository? _imageRepository = null;
        private Dictionary<string, ImageModel[]>? allImages = null;
        public CartRepository(CartDatabaseContext context, IImageRepository imageRepository)
        {
            _context = context;
            _imageRepository = imageRepository;
        }



        private async Task InitializeImageDictonary()
        {
            allImages = new Dictionary<string, ImageModel[]>();
            string[] names = { "pants", "shirt", "shoe", "shoes" };


            if (_imageRepository is not null)
            {
                foreach (string name in names)
                {
                    ImageModel[] images = await _imageRepository.GetImages(name);
                    allImages.Add(name, images);
                }
            }
        }
        // FIXME: STILL TESTING
        public async Task RemoveProductFromCart(ProductModel cartItem)
        {
            if (_context is not null)
            {
                string title = cartItem.Title.Length >= 6 ? cartItem.Title.Substring(0, 6) : cartItem.Title;
                var product = _context.Carts.FirstOrDefault(x => x.Username.Equals(cartItem.Username) &&
                                                                 x.Title.Contains(title));

                if (product != null)
                {
                    _context.Carts.Remove(product);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public List<ProductModel> GetCartByUsername(string username)
        {
           List<ProductModel> productsByUsername = GetAllProducts()!.Result.Where(x => x.Username == username).ToList();
           return productsByUsername;
        }

        public async Task UpdateCart(ProductModel cartItem)
        {
            if (_context is not null)
            {
                var product = _context.Carts.FirstOrDefault(x => x.Username.Equals(cartItem.Username) &&
                                                                          x.Title.Equals(cartItem.Title));

                if (product != null)
                {
                    product.Quantity = cartItem.Quantity;
                    product.Title = cartItem.Title;
                    product.Username = cartItem.Username;
                    product.Price = cartItem.Price;
                    product.Link = cartItem.Link;

                    _context.Carts.Attach(product);
                    _context.Entry(product).State = EntityState.Modified;


                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task FilterCarts()
        {
            if (_context is not null)
            {
                var filterQuery = @"
                    with cte as (
	                    select id, username, title, price, quantity, link, row_number() over 
	                    (partition by username, title order by id) rn
	                    from carts
                    )
                    delete from cte where rn > 1;
                ";

                await _context.Database.ExecuteSqlRawAsync(filterQuery);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<List<ProductModel>> GetAllProducts()
        {
            List<ProductModel> models = new List<ProductModel>();
            if (_context is not null)
            {
                var productsFromDb = await _context.Carts.ToListAsync();
                models = new List<ProductModel>();

                foreach (Products product in productsFromDb)
                {
                    var existingCartItems = models.Where(x => x.Username.Equals(product.Username) &&
                                                              x.Title.Equals(product.Title)).ToList();

                    if (!existingCartItems.Any())
                    {
                        models.Add(
                        new ProductModel
                        {
                            Title = product.Title,
                            Link = product.Link,
                            Price = product.Price,
                            Username = product.Username,
                            Quantity = product.Quantity
                        });
                    }
                    else
                    {
                        // Find the item and increment the quantity
                        ProductModel existingItem = existingCartItems.First();
                        existingItem.Quantity += 1;
                    }

                }
            }
            return models;
        }

        public async Task AddToCart(CartItemModel cartItem)
        {
            await InitializeImageDictonary();
            if (_context is not null)
            {
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
}
