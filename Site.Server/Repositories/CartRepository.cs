using Microsoft.EntityFrameworkCore;
using Site.Server.Data;

namespace Site.Server.Repositories
{
    public class CartRepository
    {
        private readonly CartDatabaseContext _context = null;
        public CartRepository(CartDatabaseContext context)
        {
            _context = context;
        }
    }
}
