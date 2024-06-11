using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Site.Server.Models;
using System.Threading.Tasks;

namespace Site.Server.Controllers
{

    public class PaymentController : Controller
    {

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
    }
}
