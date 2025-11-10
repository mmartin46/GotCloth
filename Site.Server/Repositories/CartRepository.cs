using AutoMapper;
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
        private readonly IMapper _mapper;

        public CartRepository(CartDatabaseContext context, IImageRepository imageRepository, IMapper mapper)
        {
            _context = context;
            _imageRepository = imageRepository;
            _mapper = mapper;
            InitializeImageDictonary();
        }



        private void InitializeImageDictonary()
        {
            allImages = new Dictionary<string, ImageModel[]>();
            string[] names = { "pants", "shirt", "shoe", "shoes" };


            if (_imageRepository is not null)
            {
                foreach (string name in names)
                {
                    ImageModel[] images = _imageRepository.GetImages(name).Result;
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

                if (product != null && _context == null)
                {
                    product = _mapper.Map<Products>(cartItem);
                    _context.Carts.Attach(product);
                    _context.Entry(product).State = EntityState.Modified;


                    await _context.SaveChangesAsync();
                }
            }
        }

        private async Task AdjustProduct(Products product, ProductModel cartItem)
        {
            if (product != null && _context == null)
            {
                product = _mapper.Map<Products>(cartItem);

                _context.Carts.Attach(product);
                _context.Entry(product).State = EntityState.Modified;


                await _context.SaveChangesAsync();
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
                        var model = _mapper.Map<ProductModel>(product);
                        models.Add(model);
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
            if (_context is not null)
            {
                List<Products> productsFromDb = _context.Carts.ToListAsync().Result;
                productsFromDb = productsFromDb.ToList();

                if (allImages != null)
                {
                    foreach (var entry in allImages)
                    {
                        ImageModel? match = entry.Value.Where(x => x.Title.Contains(cartItem.Title.Substring(0, 5))).ToList().FirstOrDefault();
                        if (match != null)
                        {
                            bool productExists = (from product in productsFromDb
                                          where product.Title.Equals(match.Title) &&
                                                product.Link.Equals(match.Link) &&
                                                product.Username.Equals(cartItem.Username)
                                          select product).Any();

                            if (!productExists)
                            {
                                Products products = new Products()
                                {
                                    Username = cartItem.Username,
                                    Title = match.Title,
                                    Link = match.Link,
                                    Price = 10.00,
                                    Quantity = 1
                                };
                                await _context.Carts.AddAsync(products);
                                await _context.SaveChangesAsync();
                            }
                            else
                            {
                                var selectedProduct = _context.Carts.FirstOrDefaultAsync(x => x.Username.Equals(cartItem.Username) &&
                                                                        x.Title.Equals(match.Title) &&
                                                                        x.Link.Equals(match.Link)).Result;
                                if (selectedProduct != null)
                                {
                                    selectedProduct.Quantity += 1;
                                    _context.Attach(selectedProduct);
                                    _context.Entry(selectedProduct).Property(p => p.Quantity).IsModified = true;
                                    await _context.SaveChangesAsync();
                                }
                            }
                            break;
                        }

                    }
                }
            }
        }

    }
}
