namespace Site.Server.Data
{
    public class Payments
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Owner { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CVC { get; set; }
    }
}
