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
        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);

            await _context.SaveChangesAsync();
        }
    }
}
    

