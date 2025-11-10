using AutoMapper;
using Site.Server.Data;
using Site.Server.Models;

namespace Site.Server.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Payments, PaymentModel>();
            CreateMap<PaymentModel, Payments>();
            CreateMap<Products, ProductModel>();
            CreateMap<ProductModel, Products>();
            CreateMap<Users, UserModel>();
            CreateMap<UserModel, Users>();
        }

    }
}
