using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user);
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<bool> UserExistsAsync(int userId);

    }
}



