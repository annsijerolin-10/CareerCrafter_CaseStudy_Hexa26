using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IResumeRepository
    {
        Task<List<Resume>> GetAllResumesAsync();

        Task<Resume?> GetResumeByIdAsync(int resumeId);

        Task UploadResumeAsync(Resume resume);
        Task UpdateResumeAsync(Resume resume);

        Task DeleteResumeAsync(Resume resume);

        Task<bool> JobSeekerExistsAsync(int jobSeekerId);
    }
}
