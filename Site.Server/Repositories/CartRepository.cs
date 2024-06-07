﻿using Microsoft.EntityFrameworkCore;
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

        public async Task UpdateCart(ProductModel cartItem)
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

        public async Task FilterCarts()
        {
            var duplicates = _context.Carts.GroupBy(c => new { c.Username, c.Title })
                                    .SelectMany(g => g.OrderByDescending(c => c.Id).Skip(1))
                                    .ToList();
            _context.Carts.RemoveRange(duplicates);
            await _context.SaveChangesAsync();
        }


        // NOT TESTED
        public async Task<List<ProductModel>> GetAllProducts()
        {
            var productsFromDb = await _context.Carts.ToListAsync();
            List<ProductModel> models = new List<ProductModel>();

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
