using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IEmployerService
    {
        Task<List<EmployerResponseDto>> GetAllEmployersAsync();

        Task<EmployerResponseDto?> GetEmployerByIdAsync(int employerId);

        Task<EmployerResponseDto> AddEmployerAsync(EmployerCreateDto employerCreateDto);
        Task<EmployerDashboardDto> GetDashboardAsync(int employerId);
        Task<CandidateProfileDto?> GetCandidateProfileAsync(int jobSeekerId)
   ;
    }
}
