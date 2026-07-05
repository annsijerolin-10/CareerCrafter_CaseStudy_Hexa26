using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IApplicationService
    {
        Task<List<ApplicationResponseDto>> GetAllApplicationsAsync();

        Task<ApplicationResponseDto?> GetApplicationByIdAsync(int applicationId);

        Task<ApplicationResponseDto> AddApplicationAsync(ApplicationCreateDto dto);
        Task<List<ApplicationResponseDto>> GetApplicationsByJobSeekerIdAsync(int jobSeekerId);





        Task<ApplicationResponseDto?> UpdateApplicationStatusAsync(int applicationId, ApplicationStatusUpdateDto dto);


        Task<List<ApplicationResponseDto>> GetApplicationsByJobIdAsync(int jobId);
        Task<bool> WithdrawApplicationAsync(int applicationId);
       


    }
}
