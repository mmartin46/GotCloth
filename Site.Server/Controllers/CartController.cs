using Microsoft.AspNetCore.Mvc;
using Site.Server.Models;
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
        public async Task<IActionResult> AddToCart([FromBody] CartItemModel cartItem)
        {
            if (cartItem == null)
            {
                return BadRequest();
            }

            await _cartRepository.AddToCart(cartItem);
            return Ok();
        }
    }
}
