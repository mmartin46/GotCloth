using Microsoft.EntityFrameworkCore;

namespace Site.Server.Data
{
    public class CartDatabaseContext : DbContext
    {
        public CartDatabaseContext(DbContextOptions<CartDatabaseContext> options) : base(options)
        {

        }

        public DbSet<Products> Carts { get; set; }
        public DbSet<Payments> Cards { get; set; }
    }
}
