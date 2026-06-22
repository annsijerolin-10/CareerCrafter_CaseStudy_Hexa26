using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllUsersAsync();

        Task<UserResponseDto?> GetUserByIdAsync(int userId);

        Task<UserResponseDto> AddUserAsync(UserCreateDto dto);
       // Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto);
    }
}
