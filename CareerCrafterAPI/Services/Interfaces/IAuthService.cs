using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto);
        Task ForgotPasswordAsync(ForgotPasswordDto dto);
        Task ChangePasswordAsync(ChangePasswordDto dto);
    }
}