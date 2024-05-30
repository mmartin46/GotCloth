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

        public async Task<Boolean> DoesUserExist(UserModel userModel)
        {
            var allUsers = await GetUsers();
            var matchingUsers = allUsers.Where(x => x.Username.Equals(userModel.Username)).ToList();
            return matchingUsers.Any();
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

        // Not Tested
        public async Task<Boolean> AuthenticateUser(UserModel userModel)
        {
            List<UserModel> users = await GetUsers();
            foreach (UserModel user in users)
            {
                if (user.Username.Equals(userModel.Username) &&
                    user.Password.Equals(userModel.Password))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
