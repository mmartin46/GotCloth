namespace Site.Server.Models
{
    public class ProductModel
    {
        public string Username { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public double Price { get; set; } = 10.00;
        public int Quantity { get; set; } = 1;
    }
}
