using Site.Server.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Site.Server.Models
{
    public class PaymentModel
    {
        [CreditCard]
        public string CardNumber { get; set; }
        [ExpirationDate]
        public string ExpirationDate { get; set; }
        [CVC]
        public string CVC { get; set; }
    }
}
