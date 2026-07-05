using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.Identity.Client;

namespace CareerCrafterAPI.Services.Implementations
{
    public class JobService:IJobService
    {
        private readonly IJobRepository _jobRepository;
        private readonly IJobSeekerRepository _jobSeekerRepository;
        private readonly ILogger<JobService> _logger;
        private readonly IMapper _mapper;


        public JobService(
            IJobRepository jobRepository,
            IJobSeekerRepository jobSeekerRepository,
            ILogger<JobService> logger,
            IMapper mapper)
        {
            _jobRepository = jobRepository;
            _jobSeekerRepository = jobSeekerRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<List<JobResponseDto>> GetAllJobsAsync()
        {
            try
            {
                _logger.LogInformation("Fetching all jobs");

                var jobs = await _jobRepository.GetAllJobsAsync();

                return _mapper.Map<List<JobResponseDto>>(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching jobs");
                throw;
            }
        }

        public async Task<JobResponseDto?> GetJobByIdAsync(int jobId)
        {
            try
            {
                _logger.LogInformation("Fetching job with Id {JobId}", jobId);

                var job = await _jobRepository.GetJobByIdAsync(jobId);

                if (job == null)
                    return null;

                return _mapper.Map<JobResponseDto>(job);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error fetching job {JobId}",
                    jobId);

                throw;
            }
        }

        public async Task<JobResponseDto> AddJobAsync(JobCreateDto dto)
        {
            try
            {
                _logger.LogInformation("Creating job {JobTitle}", dto.JobTitle);


                bool employerExists = await _jobRepository.EmployerExistsAsync(dto.EmployerId);


                if (!employerExists)
                {
                    throw new Exception("Employer not found");
                }

                if (dto.ApplicationDeadline.Date < DateTime.Today)
                {
                    throw new Exception(
                        "Application deadline cannot be in the past.");
                }
                var job = _mapper.Map<Job>(dto);

                job.PostedDate = DateTime.Now;

                await _jobRepository.AddJobAsync(job);
                _logger.LogInformation("Job created successfully. JobId: {JobId}", job.JobId);


                return _mapper.Map<JobResponseDto>(job);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error creating job {JobTitle}", dto.JobTitle);
                throw;
            }
        }
        public async Task<JobResponseDto?> UpdateJobAsync(int jobId, JobUpdateDto dto)


        {
            try
            {
                _logger.LogInformation("Updating job {JobId}", jobId);


                var job = await _jobRepository.GetJobByIdAsync(jobId);

                if (job == null)
                    return null;

                if (dto.ApplicationDeadline.Date < DateTime.Today)
                {
                    throw new Exception(
                        "Application deadline cannot be in the past.");
                }

                _mapper.Map(dto, job);

                await _jobRepository.UpdateJobAsync(job);
                _logger.LogInformation("Job updated successfully. JobId: {JobId}", jobId);


                return _mapper.Map<JobResponseDto>(job);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error updating job {JobId}", jobId);

                throw;
            }
        }
        public async Task<bool> DeleteJobAsync(int jobId)
        {
            try
            {
                _logger.LogInformation("Soft Deleting job {JobId}", jobId);


                var job = await _jobRepository.GetJobByIdAsync(jobId);

                if (job == null)
                    return false;

                await _jobRepository.DeleteJobAsync(job);
                _logger.LogInformation("Job archieved successfully. JobId: {JobId}", jobId);


                return true;
            }

               catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error deleting job {JobId}",
                    jobId);

                throw;
            }
        }
        
        public async Task<List<JobResponseDto>> GetJobsPagedAsync(
            int pageNumber,
            int pageSize,string? sortBy, bool descending)
   
        {
            try
            {

                _logger.LogInformation("Fetching jobs. PageNumber: {PageNumber}, PageSize: {PageSize}", pageNumber, pageSize);
                var jobs = await _jobRepository.GetJobsPagedAsync(
                        pageNumber,
                        pageSize,
                        sortBy,
                        descending);
                   


                return _mapper.Map<List<JobResponseDto>>(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error fetching paged jobs");

                throw;
            }
        }
        public async Task<List<JobResponseDto>> SearchJobsAsync(string? title, string? location)
        {
            try
            {
                var jobs = await _jobRepository.SearchJobsAsync(
                        title,
                        location);


                return _mapper.Map<List<JobResponseDto>>(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching jobs");


                throw;
            }
        }

        public async Task<List<JobResponseDto>> GetRecommendedJobsAsync(int jobSeekerId)

        {
            try
            {
                var jobSeeker = await _jobSeekerRepository.GetJobSeekerByIdAsync(jobSeekerId);



                if (jobSeeker == null)
                {
                    return new List<JobResponseDto>();
                }

                var jobs = await _jobRepository.GetRecommendedJobsAsync(jobSeeker.Skills);



                return _mapper.Map<List<JobResponseDto>>(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error getting recommendations for JobSeekerId {JobSeekerId}",
                    jobSeekerId);

                throw;
            }
        }


        public async Task<List<JobResponseDto>> GetJobsByEmployerIdAsync(int employerId)
        {
            try
            {
                _logger.LogInformation(
                    "Fetching jobs for EmployerId {EmployerId}",
                    employerId);

                var jobs =
                    await _jobRepository.GetJobsByEmployerIdAsync(employerId);

                return _mapper.Map<List<JobResponseDto>>(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error fetching jobs for EmployerId {EmployerId}",
                    employerId);

                throw;
            }
        }
        public async Task<bool> RestoreJobAsync(int jobId)
        {
            try
            {
                var job = await _jobRepository.GetJobByIdAsync(jobId);
                _logger.LogInformation(job == null ? "NULL" : $"Found {job.JobTitle}");

                if (job == null)
                    return false;

                await _jobRepository.RestoreJobAsync(job);

                _logger.LogInformation("Job restored successfully. JobId: {JobId}", jobId);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error restoring job {JobId}",
                    jobId);

                throw;
            }
        }

        public async Task<List<JobResponseDto>> GetArchivedJobsByEmployerIdAsync(int employerId)
        {
            var jobs = await _jobRepository
                .GetArchivedJobsByEmployerIdAsync(employerId);

            return _mapper.Map<List<JobResponseDto>>(jobs);
        }
    }
}
