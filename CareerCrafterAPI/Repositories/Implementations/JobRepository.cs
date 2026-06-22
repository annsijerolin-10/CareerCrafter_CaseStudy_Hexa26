using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class JobRepository:IJobRepository
    {
        private readonly CareerCrafterDbContext _context;

        public JobRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<List<Job>> GetAllJobsAsync()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<Job?> GetJobByIdAsync(int jobId)
        {
            return await _context.Jobs.FirstOrDefaultAsync(j => j.JobId == jobId);

        }

        public async Task AddJobAsync(Job job)
        {
            await _context.Jobs.AddAsync(job);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> EmployerExistsAsync(int employerId)
        {
            return await _context.Employers.AnyAsync(e => e.EmployerId == employerId);

        }
        public async Task UpdateJobAsync(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteJobAsync(Job job)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Job>> GetJobsPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            bool descending)
 
        {
            IQueryable<Job> query = _context.Jobs;

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy.ToLower())
                {
                    case "salary":
                        query = descending
                            ? query.OrderByDescending(j => j.Salary)
                            : query.OrderBy(j => j.Salary);
                        break;

                    case "posteddate":
                        query = descending
                            ? query.OrderByDescending(j => j.PostedDate)
                            : query.OrderBy(j => j.PostedDate);
                        break;

                    //case "jobtitle":
                    //    query = descending
                    //        ? query.OrderByDescending(j => j.JobTitle)
                    //        : query.OrderBy(j => j.JobTitle);
                    //    break;

                    default:
                        query = query.OrderBy(j => j.JobId);
                        break;
                }
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        
        public async Task<List<Job>> SearchJobsAsync(
            string? title,
            string? location)
        {
            var query = _context.Jobs.AsQueryable();

            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(j =>
                    j.JobTitle.Contains(title));
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(j =>
                    j.Location.Contains(location));
            }

            return await query.ToListAsync();
        }
        public async Task<List<Job>> GetRecommendedJobsAsync(string skills)

        {
            var skillList = skills
                .Split(',')
                .Select(s => s.Trim().ToLower())
                .ToList();

            return await _context.Jobs
                .Where(j =>
                    !string.IsNullOrEmpty(j.RequiredSkills) &&
                    skillList.Any(skill =>
                        j.RequiredSkills.ToLower().Contains(skill)))
                .ToListAsync();
        }
    }
}
