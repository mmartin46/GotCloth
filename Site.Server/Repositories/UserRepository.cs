using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;

namespace Site.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDatabaseContext _databaseContext;
        public UserRepository(UserDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            List<UserModel> userModels = new List<UserModel>();
            List<Users> users = await _databaseContext.GotClothUsers.ToListAsync();
            foreach (Users user in users)
            {
                userModels.Add(
                    new UserModel()
                    {
                        Username = user.Username,
                        Password = user.Password,
                        Email = user.Email
                    }
                );
            }
            return userModels;
        }

        public async Task InsertUser(UserModel userModel)
        {
            await _databaseContext.GotClothUsers.AddAsync
            (
                new Users()
                {
                    Username = userModel.Username,
                    Password = userModel.Password,
                    Email = userModel.Email
                }
            );

            await _databaseContext.SaveChangesAsync();
        }

        public async Task<Boolean> AuthenticateUser(UserModel userModel)
        {
            List<UserModel> users = await GetUsers();
            return users.Any(user => user.Username.Equals(userModel.Username)); 
        }

        public async Task<Boolean> AuthenticateUserWithPassword(LoginModel userModel)
        {
            var users = await GetUsers();
            return users.Any(user => user.Username.Equals(userModel.Username) &&
                                     user.Password.Equals(userModel.Password));
        }
    }
}
