using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;

namespace CareerCrafterAPI.Services.Implementations
{
    public class JobSeekerService:IJobSeekerService
    {
        private readonly IJobSeekerRepository _jobSeekerRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<JobSeekerService> _logger;
        private readonly IMapper _mapper;

        public JobSeekerService(
            IJobSeekerRepository jobSeekerRepository,
            IUserRepository userRepository,
            ILogger<JobSeekerService> logger,
            IMapper mapper)
        { 
        
            _jobSeekerRepository = jobSeekerRepository;
            _userRepository = userRepository;
            _logger = logger;
                 _mapper = mapper;
        }

        public async Task<List<JobSeekerResponseDto>> GetAllJobSeekersAsync()
        {
            _logger.LogInformation("Fetching all JobSeekers");
            var jobSeekers =
                await _jobSeekerRepository.GetAllJobSeekersAsync();

            return _mapper.Map<List<JobSeekerResponseDto>>(jobSeekers);
        }

        public async Task<JobSeekerResponseDto?> GetJobSeekerByIdAsync(int id)
        {
            _logger.LogInformation("Fetching JobSeeker with Id {JobSeekerId}", id);


            var jobSeeker = await _jobSeekerRepository.GetJobSeekerByIdAsync(id);


            if (jobSeeker == null)
                return null;

            return _mapper.Map<JobSeekerResponseDto>(jobSeeker);
        }

        public async Task<JobSeekerResponseDto> AddJobSeekerAsync(JobSeekerCreateDto dto)

        {
            try
            {
                _logger.LogInformation("Creating JobSeeker for UserId {UserId}", dto.UserId);


                bool userExists = await _userRepository.UserExistsAsync(dto.UserId);


                if (!userExists)
                {
                    throw new Exception("User not found");
                }

                var jobSeeker = _mapper.Map<JobSeeker>(dto);

                await _jobSeekerRepository.AddJobSeekerAsync(jobSeeker);
                _logger.LogInformation("JobSeeker created successfully. JobSeekerId: {JobSeekerId}", jobSeeker.JobSeekerId);


                return _mapper.Map<JobSeekerResponseDto>(jobSeeker);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating JobSeeker for UserId {UserId}", dto.UserId);




                throw;

            }


        }
        public async Task<JobSeekerResponseDto?> UpdateJobSeekerAsync(
                    int id,
                    JobSeekerUpdateDto dto)

        {
            try
            {
                _logger.LogInformation(
                    "Updating JobSeeker {JobSeekerId}",
                    id);

                var jobSeeker = await _jobSeekerRepository.GetJobSeekerByIdAsync(id);



                if (jobSeeker == null)
                {
                    return null;
                }

                _mapper.Map(dto, jobSeeker);

                await _jobSeekerRepository.UpdateJobSeekerAsync(jobSeeker);


                _logger.LogInformation("JobSeeker updated successfully. JobSeekerId: {JobSeekerId}", id);



                return _mapper.Map<JobSeekerResponseDto>(
                    jobSeeker);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error updating JobSeeker {JobSeekerId}",
                    id);

                throw;
            }
        }
    }
}
