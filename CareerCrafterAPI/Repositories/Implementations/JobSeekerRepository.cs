using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class JobSeekerRepository:IJobSeekerRepository
    {
        private readonly CareerCrafterDbContext _context;

        public JobSeekerRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobSeeker>> GetAllJobSeekersAsync()
        {
            return await _context.JobSeekers.Include(js => js.User).ToListAsync();
        }

        public async Task<JobSeeker?> GetJobSeekerByIdAsync(int id)
        {
            return await _context.JobSeekers.Include(js => js.User)
                .FirstOrDefaultAsync(j => j.JobSeekerId == id);
        }

        public async Task AddJobSeekerAsync(JobSeeker jobSeeker)
        {
            await _context.JobSeekers.AddAsync(jobSeeker);

            await _context.SaveChangesAsync();
        }
        public async Task UpdateJobSeekerAsync(JobSeeker jobSeeker)
        {
            _context.JobSeekers.Update(jobSeeker);

            await _context.SaveChangesAsync();
        }
    }
}
