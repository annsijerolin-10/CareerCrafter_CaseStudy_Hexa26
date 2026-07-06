using CareerCrafterAPI.Data;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly CareerCrafterDbContext _context;

        public EmployerRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employer>> GetAllEmployersAsync()
        {
            return await _context.Employers.ToListAsync();
        }

        public async Task<Employer?> GetEmployerByIdAsync(int employerId)
        {
            return await _context.Employers
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.EmployerId == employerId);
        }

        public async Task AddEmployerAsync(Employer employer)
        {
            await _context.Employers.AddAsync(employer);

            await _context.SaveChangesAsync();
        }
        public async Task<bool> UserExistsAsync(int userId)
        {
            return await _context.Users.AnyAsync(u => u.UserId == userId);
        }
        public async Task<EmployerDashboardDto> GetDashboardAsync(int employerId)
        {
            var jobs = await _context.Jobs
     .Where(j => j.EmployerId == employerId)
     .ToListAsync();

            var activeJobs = jobs.Where(j => !j.IsDeleted).ToList();

            var archivedJobs = jobs.Where(j => j.IsDeleted).ToList();

            var jobIds = jobs
                .Select(j => j.JobId)
                .ToList();

            var applications = await _context.Applications
                .Where(a => jobIds.Contains(a.JobId))
                .ToListAsync();

            return new EmployerDashboardDto
            {
                TotalJobsPosted = jobs.Count,
                ActiveJobsCount = activeJobs.Count,

                ArchivedJobsCount = archivedJobs.Count,
                TotalApplications = applications.Count,

                AppliedCount = applications.Count(a => a.Status == "Applied"),


                ShortlistedCount = applications.Count(a => a.Status == "Shortlisted"),
                RejectedCount = applications.Count(a => a.Status == "Rejected"),
                WithdrawnCount = applications.Count(a => a.Status == "Withdrawn")

            };
        }
        public async Task<CandidateProfileDto?> GetCandidateProfileAsync(int jobSeekerId)

        {
            var jobSeeker = await _context.JobSeekers
                .Include(j => j.User)
                .FirstOrDefaultAsync(j => j.JobSeekerId == jobSeekerId);

            if (jobSeeker == null)
            {
                return null;
            }

            var resume = await _context.Resumes
                .Where(r => r.JobSeekerId == jobSeekerId)
                .OrderByDescending(r => r.UploadDate)
                .FirstOrDefaultAsync();

            return new CandidateProfileDto
            {
                JobSeekerId = jobSeeker.JobSeekerId,
                FullName = jobSeeker.User?.FullName?? string.Empty,
                Email = jobSeeker.User?.Email?? string.Empty,
                Phone = jobSeeker.Phone,
                Address = jobSeeker.Address,
                Skills = jobSeeker.Skills,
                ExperienceYears = jobSeeker.ExperienceYears,
                ResumeFile = resume?.ResumeFile
            };
        }

        public async Task UpdateEmployerAsync(
    Employer employer)
        {
            _context.Employers.Update(employer);

            await _context.SaveChangesAsync();
        }
    }

}
