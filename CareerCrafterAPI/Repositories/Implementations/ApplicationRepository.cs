using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class ApplicationRepository:IApplicationRepository
    {
        private readonly CareerCrafterDbContext _context;

        public ApplicationRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<List<Application>> GetAllApplicationsAsync()
        {
            return await _context.Applications
               .Include(a => a.Job)
                    .ThenInclude(j => j!.Employer)
                .Include(a => a.JobSeeker)
                    .ThenInclude(js => js!.User)
                .ToListAsync();
        }

        public async Task<Application?> GetApplicationByIdAsync(int applicationId)
        {
            return await _context.Applications.Include(a => a.Job)
                .Include(a => a.Job)
                    .ThenInclude(j => j!.Employer)
                .Include(a => a.JobSeeker)
                .ThenInclude(js => js!.User)
                .FirstOrDefaultAsync(a => a.ApplicationId == applicationId);
        }

        public async Task AddApplicationAsync(Application application)
        {
            await _context.Applications.AddAsync(application);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> JobExistsAsync(int jobId)
        {
            return await _context.Jobs.AnyAsync(j => j.JobId == jobId);
        }

        public async Task<bool> JobSeekerExistsAsync(int jobSeekerId)
        {
            return await _context.JobSeekers
                .AnyAsync(j => j.JobSeekerId == jobSeekerId);
        }
        public async Task<List<Application>> GetApplicationsByJobSeekerIdAsync(int jobSeekerId)


        {
            return await _context.Applications
                .Include(a => a.Job)
                    .ThenInclude(j => j!.Employer)
                .Include(a => a.JobSeeker)
                    .ThenInclude(js => js!.User)
                .Where(a => a.JobSeekerId == jobSeekerId)
                .ToListAsync();
        }

        public async Task UpdateApplicationAsync(Application application)

        {
            _context.Applications.Update(application);

            await _context.SaveChangesAsync();
        }

        public async Task<List<Application>> GetApplicationsByJobIdAsync(int jobId)

        {
            return await _context.Applications
                .Include(a => a.JobSeeker)
                .ThenInclude(js => js!.User)
                .Where(a => a.JobId == jobId)
                .ToListAsync();
        }
    }
}
