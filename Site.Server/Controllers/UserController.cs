﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Site.Server.Models;
using Site.Server.Repositories;

namespace Site.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {

        private readonly IUserRepository _userRepository = null;

        public UserController(IUserRepository userRepository) 
        { 
            _userRepository = userRepository;
        }

        [HttpGet]
        public JsonResult GetUser([FromQuery] string username)
        {
            var user = _userRepository.GetUser(username);
            return Json(user);
        }


        [EnableRateLimiting("register")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel userModel)
        {

            if (!userModel.Password.Equals(userModel.ConfirmPassword))
            {
                return BadRequest("Passwords don't match!");
            }
            
            if (!userModel.Email.Equals(userModel.ConfirmEmail))
            {
                return BadRequest("Emails don't match!");
            }

            bool doesUserExist = await _userRepository.AuthenticateUser(userModel);
            if (doesUserExist)
            {
                return BadRequest("Username already exists");
            }

            await _userRepository.InsertUser(userModel);

            return Json(userModel);
        }

        [EnableRateLimiting("login")]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userModel)
        {
            bool doesUserExist = await _userRepository.AuthenticateUserWithPassword(userModel);
            if (!doesUserExist)
            {
                return BadRequest("Username doesn't exist");
            }

            return Json(userModel);
        }
    }


}
