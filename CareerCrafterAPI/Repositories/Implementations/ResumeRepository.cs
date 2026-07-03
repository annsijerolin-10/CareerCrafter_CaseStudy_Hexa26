using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class ResumeRepository:IResumeRepository
    {
        private readonly CareerCrafterDbContext _context;

        public ResumeRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }

        public async Task<List<Resume>> GetAllResumesAsync()
        {
            return await _context.Resumes.ToListAsync();
        }

        public async Task<Resume?> GetResumeByIdAsync(int resumeId)
        {
            return await _context.Resumes
                .FirstOrDefaultAsync(r => r.ResumeId == resumeId);
        }

        public async Task AddResumeAsync(Resume resume)
        {
            await _context.Resumes.AddAsync(resume);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> CanDeleteResumeAsync(int resumeId)
        {
            return !await _context.Applications
                .AnyAsync(a =>
                    a.ResumeId == resumeId &&
                    a.Status != "Withdrawn");
        }

        public async Task<bool> JobSeekerExistsAsync(int jobSeekerId)
        {
            return await _context.JobSeekers
                .AnyAsync(j => j.JobSeekerId == jobSeekerId);
        }
        public async Task UpdateResumeAsync(Resume resume)
        {
            _context.Resumes.Update(resume);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteResumeAsync(Resume resume)
        {
            _context.Resumes.Remove(resume);
            await _context.SaveChangesAsync();
        }


        public async Task<List<Resume>> GetResumeByJobSeekerIdAsync(int jobSeekerId)
        {
            return await _context.Resumes
                .Where(r => r.JobSeekerId == jobSeekerId)
                .OrderByDescending(r => r.UploadDate)
                .ToListAsync();
        }
    }

}
