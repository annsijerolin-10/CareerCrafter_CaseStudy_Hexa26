using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly CareerCrafterDbContext _context;
        public UserRepository(CareerCrafterDbContext context)
        {
            _context = context;

        }
        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
            
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(a => a.UserId == id);
        }
        public async Task<bool> UserExistsAsync(int userId)
        {
            return await _context.Users.AnyAsync(u => u.UserId == userId);
        }
    }
}
