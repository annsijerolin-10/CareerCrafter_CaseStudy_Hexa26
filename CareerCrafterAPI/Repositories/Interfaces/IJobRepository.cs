using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IJobRepository
    {
        Task<List<Job>> GetAllJobsAsync();

        Task<Job?> GetJobByIdAsync(int jobId);

        Task AddJobAsync(Job job);
        Task UpdateJobAsync(Job job);

        Task DeleteJobAsync(Job job);

        Task<bool> EmployerExistsAsync(int employerId);
        Task<List<Job>> GetJobsPagedAsync(
         string skills,
         int pageNumber,
         int pageSize,
         string? sortBy,
         bool descending);
        Task<List<Job>> SearchJobsAsync(string? title, string? location);



        Task<List<Job>> GetRecommendedJobsAsync(string skills);


        Task<List<Job>> GetJobsByEmployerIdAsync(int employerId);
        Task RestoreJobAsync(Job job);

        Task<List<Job>> GetArchivedJobsByEmployerIdAsync(int employerId);

        
    }
}
