
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
        private readonly IEmployerRepository _employerRepository;
        private readonly IJobSeekerRepository _jobSeekerRepository;
        //private readonly IJwtService _jwtService;
        // private readonly IAuthRepository _authRepository;
        public UserService(IUserRepository userRepository,IEmployerRepository employerRepository,IJobSeekerRepository jobSeekerRepository, ILogger<UserService> logger, IMapper mapper)
        {
            _userRepository = userRepository;
            _logger = logger;
            _mapper = mapper;
            _employerRepository = employerRepository;
            _jobSeekerRepository= jobSeekerRepository; 
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
                bool emailExists = await _userRepository.EmailExistsAsync(dto.Email);


                if (emailExists)
                {
                    throw new Exception("Email already registered");
                }
                _logger.LogInformation("Creating user with email {Email}", dto.Email);
                var user = _mapper.Map<User>(dto);

                user.PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(dto.Password);

                await _userRepository.AddUserAsync(user);
                if (user.Role.Equals("Employer", StringComparison.OrdinalIgnoreCase))

                {
                    var employer = new Employer
                    {
                        UserId = user.UserId,
                        CompanyName = dto.CompanyName ?? "",
                        CompanyDescription = dto.CompanyDescription ?? ""
                    };

                    await _employerRepository.AddEmployerAsync(employer);
                }
                else
                {
                    var jobSeeker = new JobSeeker
                    {
                        UserId = user.UserId,
                        Phone = dto.Phone ?? "",
                        Address = dto.Address ?? "",
                        Skills = dto.Skills ?? "",
                        ExperienceYears = dto.ExperienceYears
                    };

                    await _jobSeekerRepository.AddJobSeekerAsync(jobSeeker);
                }

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
