
using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Implementations;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CareerCrafterAPI.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        private readonly IMapper _mapper;
        //private readonly IJwtService _jwtService;
        // private readonly IAuthRepository _authRepository;
        public UserService(IUserRepository userRepository,ILogger<UserService> logger, IMapper mapper)
        {
            _userRepository = userRepository;
            _logger = logger;
            _mapper = mapper;
            // _jwtService = jwtService;
            //_authRepository = authRepository;
        }

     

        public async Task<List<UserResponseDto>> GetAllUsersAsync()
        {
            _logger.LogInformation("Fetching all users");
            var user = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<List<UserResponseDto>>(user);


        }

        public async Task<UserResponseDto?> GetUserByIdAsync(int userId)
        {
            _logger.LogInformation("Fetching user with Id {UserId}",userId);
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            return _mapper.Map<UserResponseDto>(user);


        }



     public async Task<UserResponseDto> AddUserAsync(UserCreateDto dto)
    {
            try
            {
                _logger.LogInformation("Creating user with email {Email}", dto.Email);
                var user = _mapper.Map<User>(dto);

                user.PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(dto.Password);

                await _userRepository.AddUserAsync(user);

                _logger.LogInformation("User created successfully. UserId: {UserId}", user.UserId);


                return _mapper.Map<UserResponseDto>(user);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error while creating user {Email}", dto.Email);
                throw;
            }
    }
        //public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto)

        //{
        //    var user = await _authRepository.GetUserByEmailAsync(dto.Email);



        //    if (user == null)
        //    {
        //        return null;
        //    }

        //    bool valid =
        //        BCrypt.Net.BCrypt.Verify(
        //            dto.Password,
        //            user.PasswordHash);

        //    if (!valid)
        //    {
        //        return null;
        //    }

        //    var token = _jwtService.GenerateToken(user);

        //    return new LoginResponseDto
        //    {
        //        Token = token,
        //        Email = user.Email,
        //        Role = user.Role
        //    };
        








    }
}
