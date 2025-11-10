using Site.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Site.Server.Data
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
