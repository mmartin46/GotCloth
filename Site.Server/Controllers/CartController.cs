using Microsoft.AspNetCore.Mvc;
using Site.Server.Repositories;


namespace Site.Server.Controllers
{
    public class CartController : Controller
    {
        private readonly ICartRepository _cartRepository = null;
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpPost]
        [Route("/AddToCart")]
        public async Task<IActionResult> AddToCart(string username, string title)
        {
            await _cartRepository.AddToCart(username, title);
            return new EmptyResult();
        }
    }
}
