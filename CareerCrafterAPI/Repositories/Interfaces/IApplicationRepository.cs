
using CareerCrafterAPI.Models;
namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IApplicationRepository
    {
        Task<List<Application>> GetAllApplicationsAsync();

        Task<Application?> GetApplicationByIdAsync(int applicationId);

        Task AddApplicationAsync(Application application);

        Task<bool> JobExistsAsync(int jobId);

        Task<bool> JobSeekerExistsAsync(int jobSeekerId);

        Task<List<Application>> GetApplicationsByJobSeekerIdAsync(
    int jobSeekerId);


        Task UpdateApplicationAsync(Application application);

        Task<List<Application>> GetApplicationsByJobIdAsync(int jobId);
        Task<bool> ResumeBelongsToJobSeekerAsync(
    int resumeId,
    int jobSeekerId);

    }
}
