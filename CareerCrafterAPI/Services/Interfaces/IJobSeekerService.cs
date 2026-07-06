using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IJobSeekerService
    {
        Task<List<JobSeekerResponseDto>> GetAllJobSeekersAsync();

        Task<JobSeekerResponseDto?> GetJobSeekerByIdAsync(int id);

        Task<JobSeekerResponseDto> AddJobSeekerAsync(JobSeekerCreateDto dto);


        Task<JobSeekerResponseDto?> UpdateJobSeekerAsync(
            int id,
            JobSeekerUpdateDto dto);

        Task<JobSeekerDashboardDto> GetDashboardAsync(int jobSeekerId);
    }
}
