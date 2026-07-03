using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IResumeRepository
    {
        Task<List<Resume>> GetAllResumesAsync();

        Task<Resume?> GetResumeByIdAsync(int resumeId);

        Task AddResumeAsync(Resume resume);
        Task UpdateResumeAsync(Resume resume);

        Task DeleteResumeAsync(Resume resume);

        Task<bool> JobSeekerExistsAsync(int jobSeekerId);
        //Task<List<Resume>> GetByJobSeekerIdAsync(int jobSeekerId);

        Task<List<Resume>> GetResumeByJobSeekerIdAsync(int jobSeekerId);

        Task<bool> CanDeleteResumeAsync(int resumeId);
    }
}
