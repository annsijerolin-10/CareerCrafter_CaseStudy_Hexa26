using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
