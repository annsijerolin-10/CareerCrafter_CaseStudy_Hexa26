using Asp.Versioning;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
            private readonly IAuthService _authService;

            public AuthController(IAuthService authService)
            {
                _authService = authService;
            }

            [HttpPost("login")]
            public async Task<IActionResult> Login(LoginRequestDto dto)

            {
                var result = await _authService.LoginAsync(dto);


            if (result == null)
                {
                    return Unauthorized("Invalid email or password");

            }

                return Ok(result);
            }
        [HttpPut("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)

        {
            await _authService
                .ForgotPasswordAsync(dto);

            return Ok(new
            {
                Message = "Password reset successfully."
            });
        }

        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(
    ChangePasswordDto dto)
        {
            await _authService.ChangePasswordAsync(dto);

            return Ok(new
            {
                Message = "Password changed successfully."
            });
        }


    }
}
