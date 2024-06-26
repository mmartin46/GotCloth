﻿using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Models;

namespace Site.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDatabaseContext _databaseContext;
        private const double defaultPrice = 0.00;
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
                        Email = user.Email,
                        AmountDue = user.AmountDue,
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
                    Email = userModel.Email,
                    AmountDue = userModel.AmountDue,
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
