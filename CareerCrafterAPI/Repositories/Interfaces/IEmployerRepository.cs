using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IEmployerRepository
    {
        Task<List<Employer>> GetAllEmployersAsync();

        Task<Employer?> GetEmployerByIdAsync(int employerId);

        Task AddEmployerAsync(Employer employer);
        Task<EmployerDashboardDto> GetDashboardAsync(int employerId);
        Task<CandidateProfileDto?> GetCandidateProfileAsync(int jobSeekerId);
        Task UpdateEmployerAsync(Employer employer);
    }
}
