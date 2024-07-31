using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;

namespace Site.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDatabaseContext _databaseContext;
        private const double defaultPrice = 0.00;
        private readonly IMapper _mapper;
        public UserRepository(UserDatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            List<UserModel> userModels = new List<UserModel>();
            List<Users> users = await _databaseContext.GotClothUsers.ToListAsync();
            foreach (Users user in users)
            {
                var model = _mapper.Map<UserModel>(user);
                userModels.Add(model);
            }
            return userModels;
        }

        public UserModel? GetUser(string username)
        {
            var user = GetUsers().Result.FirstOrDefault();
            return user;
        }

        public async Task InsertUser(UserModel userModel)
        {
            var user = _mapper.Map<Users>(userModel);
            await _databaseContext.GotClothUsers.AddAsync(user);

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

        public async Task UpdateTotalDue(string username, double amountDue)
        {
            var user = _databaseContext.GotClothUsers.FirstOrDefault(x => x.Username.Equals(username));

            if (user != null)
            {
                user.AmountDue = amountDue;
                _databaseContext.Attach(user);
                _databaseContext.Entry(user).State = EntityState.Modified;

                await _databaseContext.SaveChangesAsync();
            }
        }

        public async Task<Double> GetTotalDue(string username)
        {
            var user = _databaseContext.GotClothUsers.FirstOrDefault(x => x.Username.Equals(username));
            if (user != null)
            {
                return user.AmountDue;
            }
            return defaultPrice;
        }
    }
}
