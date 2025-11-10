using System.ComponentModel.DataAnnotations;

namespace Site.Server.Models
{
    public class UserModel
    {
        [Required]
        [MinLength(5)]
        public string Username { get; set; }

        [Required]
        [MinLength(5)]
        public string Password { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [EmailAddress]
        public string ConfirmEmail { get; set; }
        public double AmountDue {  get; set; }
    }
}
