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
        Task<Resume?> GetByJobSeekerIdAsync(int jobSeekerId);
    }
}
