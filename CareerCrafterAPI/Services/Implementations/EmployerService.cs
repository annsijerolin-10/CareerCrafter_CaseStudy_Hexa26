using AutoMapper;
using CareerCrafterAPI.Data;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Services.Implementations
{
    public class EmployerService: IEmployerService
    {

        private readonly IEmployerRepository _employerRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<EmployerService> _logger;
        private readonly IMapper _mapper;
        public EmployerService(
            IEmployerRepository employerRepository, 
            IUserRepository userRepository, 
            ILogger<EmployerService> logger,
            IMapper mapper)


        {
            _employerRepository = employerRepository;
            _userRepository = userRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<List<EmployerResponseDto>> GetAllEmployersAsync()
        {
            _logger.LogInformation("Fetching all employers");
            var employers = await _employerRepository.GetAllEmployersAsync();

            return _mapper.Map<List<EmployerResponseDto>>(employers);
        }

        public async Task<EmployerResponseDto?> GetEmployerByIdAsync(int employerId)
        {
            _logger.LogInformation(
    "Fetching employer with Id {EmployerId}",
    employerId);
            var employer =
        await _employerRepository
            .GetEmployerByIdAsync(employerId);

            if (employer == null)
                return null;

            return _mapper.Map<EmployerResponseDto>(
                employer);
        }


        public async Task<EmployerResponseDto?>
UpdateEmployerAsync(
    int employerId,
    EmployerUpdateDto dto)
        {
            var employer =
                await _employerRepository
                    .GetEmployerByIdAsync(employerId);

            if (employer == null)
                return null;

            _mapper.Map(dto, employer);

            await _employerRepository
                .UpdateEmployerAsync(employer);

            return _mapper.Map<EmployerResponseDto>(
                employer);
        }
        public async Task<EmployerResponseDto> AddEmployerAsync(EmployerCreateDto dto)
        {
            try
            {
                _logger.LogInformation(
           "Creating employer {CompanyName}",
           dto.CompanyName);


                bool userExists = await _userRepository.UserExistsAsync(dto.UserId);


                if (!userExists)
                {
                    throw new Exception("User not found");
                }

                var employer = _mapper.Map<Employer>(dto);

                await _employerRepository.AddEmployerAsync(employer);
                _logger.LogInformation("Employer created successfully. EmployerId: {EmployerId}", employer.EmployerId);


                return _mapper.Map<EmployerResponseDto>(employer);
            }
            catch(Exception ex)
            {
                _logger.LogError(
           ex,
           "Error creating employer {CompanyName}",
           dto.CompanyName);

                throw;
            }
        }
        public async Task<EmployerDashboardDto> GetDashboardAsync(int employerId)

        {
            return await _employerRepository.GetDashboardAsync(employerId);

        }

        public async Task<CandidateProfileDto?> GetCandidateProfileAsync(int jobSeekerId)

        {
            return await _employerRepository.GetCandidateProfileAsync(jobSeekerId);
        }


    }
}
