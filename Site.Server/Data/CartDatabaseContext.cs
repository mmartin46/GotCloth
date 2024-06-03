using Microsoft.EntityFrameworkCore;

namespace Site.Server.Data
{
    public class CartDatabaseContext : DbContext
    {
        public CartDatabaseContext(DbContextOptions<CartDatabaseContext> options) : base(options)
        {

        }

        DbSet<Products> Carts { get; set; }
    }
}
