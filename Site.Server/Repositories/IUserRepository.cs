using Site.Server.Models;

namespace Site.Server.Repositories
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetUsers();
        Task InsertUser(UserModel userModel);
        Task<Boolean> AuthenticateUser(UserModel userModel);
        Task<Boolean> AuthenticateUserWithPassword(LoginModel userModel);
    }
}