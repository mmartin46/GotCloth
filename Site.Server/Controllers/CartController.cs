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

        [HttpGet]
        [Route("/GetCart")]
        public IActionResult GetCart(UserModel userModel)
        {
            if (userModel.Username == null)
            {
                return BadRequest();
            }

            List<ProductModel> productsBought = _cartRepository.GetCartByUsername(userModel.Username);
            return Ok(productsBought);
        }
    }
}
