using System.ComponentModel.DataAnnotations;

namespace Site.Server.Models
{
    public class LoginModel
    {
        [Required]
        [StringLength(30, MinimumLength = 5)]
        public string Username { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 5)]
        public string Password { get; set; }
    }
}
