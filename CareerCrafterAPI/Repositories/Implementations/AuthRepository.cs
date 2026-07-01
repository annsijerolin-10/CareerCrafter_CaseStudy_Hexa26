using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CareerCrafterDbContext _context;

        public AuthRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.Employer)
                .Include(u => u.JobSeeker)
                .FirstOrDefaultAsync(u => u.Email == email);

        }
    }
}
    

