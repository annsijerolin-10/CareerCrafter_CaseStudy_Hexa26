using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IJobSeekerRepository
    {
        Task<List<JobSeeker>> GetAllJobSeekersAsync();

        Task<JobSeeker?> GetJobSeekerByIdAsync(int id);

        Task AddJobSeekerAsync(JobSeeker jobSeeker);
        Task UpdateJobSeekerAsync(JobSeeker jobSeeker);
    }
}
