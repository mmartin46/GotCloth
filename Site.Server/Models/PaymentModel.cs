using Site.Server.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Site.Server.Models
{
    public class PaymentModel
    {
        public string? Username { get; set; }
        public string? Owner { get; set; }
        public string? CardNumber { get; set; }
        [ExpirationDate]
        public string? ExpirationDate { get; set; }
        [CVC]
        public string? CVC { get; set; }
    }
}
