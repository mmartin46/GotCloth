using Microsoft.EntityFrameworkCore;

namespace Site.Server.Data
{
    public class UserDatabaseContext : DbContext
    {
        public UserDatabaseContext(DbContextOptions<UserDatabaseContext> options) : base(options)
        {

        }

        // Table Name
        public DbSet<Users> GotClothUsers { get; set; }
    }
}
