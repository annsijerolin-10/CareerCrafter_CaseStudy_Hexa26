using Asp.Versioning;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    

    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;


        }



        [HttpGet]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(new
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Users retrieved successfully",
                Data = users
            });
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetUserById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Invalid User Id"
                });
            }

            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "User not found"
                });
            }

            return Ok(new
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "User retrieved successfully",
                Data = user
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(UserCreateDto dto)
        {
            try
            {
                var user = await _userService.AddUserAsync(dto);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


            //[HttpGet]
            //public async Task<IActionResult> GetAllUsers()
            //{
            //    var users = await _userService.GetAllUsersAsync();

            //    return Ok(new
            //    {
            //        StatusCode = StatusCodes.Status200OK,
            //        Message = "Users retrieved successfully",
            //        Data = users
            //    });
            //}
        }
}
