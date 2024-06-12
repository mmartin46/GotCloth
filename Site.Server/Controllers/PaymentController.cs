using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Site.Server.Models;
using Site.Server.Repositories;
using System.Threading.Tasks;

namespace Site.Server.Controllers
{

    public class PaymentController : Controller
    {
        private readonly IUserRepository _userRepository = null;
        public PaymentController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("/payment")]
        public async Task<IActionResult> Payment([FromBody] PaymentModel paymentModel)
        {
            if (paymentModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPatch]
        [Route("/appendTotal")]
        public async Task<IActionResult> AppendTotal([FromBody] TransferPriceModel priceModel)
        {
            await _userRepository.UpdateTotalDue(priceModel.Name, priceModel.Price);
            return Ok();
        }
    }
}
