using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IJobService
    {
        Task<List<JobResponseDto>> GetAllJobsAsync();

        Task<JobResponseDto?> GetJobByIdAsync(int jobId);

        Task<JobResponseDto> AddJobAsync(JobCreateDto dto);
        Task<JobResponseDto?> UpdateJobAsync(int jobId, JobUpdateDto dto);



        Task<bool> DeleteJobAsync(int jobId);
        Task<List<JobResponseDto>> GetJobsPagedAsync(
            int jobSeekerId,
            int pageNumber,
            int pageSize,
            string? sortBy,
            bool descending);
        Task<List<JobResponseDto>> SearchJobsAsync(
            string? title,
            string? location);

        Task<List<JobResponseDto>> GetRecommendedJobsAsync(int jobSeekerId);
        Task<List<JobResponseDto>> GetJobsByEmployerIdAsync(int employerId);
        Task<bool> RestoreJobAsync(int jobId);

        Task<List<JobResponseDto>> GetArchivedJobsByEmployerIdAsync(int employerId);
    }
}
