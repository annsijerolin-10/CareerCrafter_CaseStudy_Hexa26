using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
    }
}
