using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CareerCrafterAPI.Services.Implementations
{
    public class AuthService:IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(IAuthRepository authRepository, IJwtService jwtService,ILogger<AuthService> logger)


        {
            _authRepository = authRepository;
            _jwtService = jwtService;
            _logger = logger;
        }

        public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto)
        {
            try
            {
                var user = await _authRepository.GetUserByEmailAsync(dto.Email);



                if (user == null)
                {
                    _logger.LogWarning("Login failed. User not found: {Email}", dto.Email);


                    return null;
                }

                bool validPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);




                if (!validPassword)
                {
                    _logger.LogWarning("Invalid password for {Email}", dto.Email);
                    return null;
                }

                var token = _jwtService.GenerateToken(user);

                return new LoginResponseDto
                {
                    Token = token,
                    Email = user.Email,
                    Role = user.Role,
                    UserId = user.UserId,
                    FullName = user.FullName,
                    EmployerId = user.Employer?.EmployerId,
                    JobSeekerId = user.JobSeeker?.JobSeekerId
                };
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error during login for {Email}", dto.Email);
                throw new Exception($"Login failed: {ex.Message}");
            }
        }
    
    }
}
