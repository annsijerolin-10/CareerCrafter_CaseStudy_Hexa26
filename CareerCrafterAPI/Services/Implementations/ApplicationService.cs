using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Implementations;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using System.Drawing.Text;
using System.Net.NetworkInformation;
namespace CareerCrafterAPI.Services.Implementations
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly ILogger<ApplicationService> _logger;
        private readonly IMapper _mapper;
        private readonly INotificationRepository _notificationRepository;
        private readonly IEmployerNotificationRepository _employerNotificationRepository;
        public ApplicationService(
            IApplicationRepository applicationRepository,
            ILogger<ApplicationService> logger,
            IMapper mapper,
            INotificationRepository notificationRepository,
            IEmployerNotificationRepository employerNotificationRepository)

        {
            _applicationRepository = applicationRepository;
            _logger = logger;
            _mapper = mapper;
            _notificationRepository = notificationRepository;
            _employerNotificationRepository = employerNotificationRepository;

        }

        public async Task<List<ApplicationResponseDto>> GetAllApplicationsAsync()
        {
            try
            {
                _logger.LogInformation("Fetching all applications");
                var applications = await _applicationRepository.GetAllApplicationsAsync();
                return _mapper.Map<List<ApplicationResponseDto>>(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex, "Error fetching application");
                throw;
            }
        }

        public async Task<ApplicationResponseDto?> GetApplicationByIdAsync(int applicationId)
        {
            try
            {
                _logger.LogInformation("Fetching application with Id {ApplicationId}", applicationId);


                var application =
                    await _applicationRepository.GetApplicationByIdAsync(applicationId);

                if (application == null)
                    return null;

                return _mapper.Map<ApplicationResponseDto>(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error fetching application {ApplicationId}",
                    applicationId);

                throw;
            }
        }

        public async Task<ApplicationResponseDto> AddApplicationAsync(ApplicationCreateDto dto)
        {
            try
            {

                _logger.LogInformation("Applying for JobId {JobId} by JobSeekerId {JobSeekerId}", dto.JobId, dto.JobSeekerId);
                bool alreadyApplied =
                    await _applicationRepository.HasAlreadyAppliedAsync(
                        dto.JobId,
                        dto.JobSeekerId);

                if (alreadyApplied)
                {
                    throw new Exception("You have already applied for this job.");
                }
                bool validResume =
                    await _applicationRepository
                        .ResumeBelongsToJobSeekerAsync(
                            dto.ResumeId,
                            dto.JobSeekerId);

                if (!validResume)
                {
                    throw new Exception("Invalid resume selected.");
                }


                bool jobExists = await _applicationRepository.JobExistsAsync(dto.JobId);


                if (!jobExists)
                {
                    throw new Exception("Job not found");
                }
                var job = await _applicationRepository.GetJobByIdAsync(dto.JobId);


                if (job == null)
                {
                    throw new Exception("Job not found");
                }

                if (job.ApplicationDeadline.Date < DateTime.Today)
                {
                    throw new Exception(
                        "The application deadline has passed.");
                }

                bool jobSeekerExists = await _applicationRepository.JobSeekerExistsAsync(dto.JobSeekerId);


                if (!jobSeekerExists)
                {
                    throw new Exception("Job Seeker not found");
                }

                var application = _mapper.Map<Application>(dto);

                application.ApplicationDate = DateTime.Now;
                application.Status = "Applied";

                await _applicationRepository.AddApplicationAsync(application);
                _logger.LogInformation("Application created successfully. ApplicationId: {ApplicationId}", application.ApplicationId);
                await _employerNotificationRepository.AddNotificationAsync(
                    new EmployerNotification
                    {
                        EmployerId = job.EmployerId,

                        ApplicationId = application.ApplicationId,

                        Message = $"A new application has been received for '{job.JobTitle}'.",

                        CreatedDate = DateTime.Now,

                        IsRead = false
                    });



                var savedApplication = await _applicationRepository.GetApplicationByIdAsync(
                        application.ApplicationId);


                return _mapper.Map<ApplicationResponseDto>(savedApplication);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error applying for JobId {JobId}",
                    dto.JobId);

                throw;
            }



        }
        public async Task<List<ApplicationResponseDto>> GetApplicationsByJobSeekerIdAsync(int jobSeekerId)


        {
            try
            {
                var applications = await _applicationRepository.GetApplicationsByJobSeekerIdAsync(jobSeekerId);
                return _mapper.Map<List<ApplicationResponseDto>>(applications);


            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error fetching applications for JobSeekerId {JobSeekerId}",
                    jobSeekerId);

                throw;
            }
        }


        public async Task<ApplicationResponseDto?> UpdateApplicationStatusAsync(
                int applicationId,
                ApplicationStatusUpdateDto dto)
        {
            try
            {
                _logger.LogInformation("Updating application {ApplicationId} to status {Status}",
                        applicationId,
                        dto.Status);

                var application = await _applicationRepository.GetApplicationByIdAsync(applicationId);



                if (application == null)
                {
                    return null;
                }
                if (application.Status == "Withdrawn")
                {
                    throw new Exception(
                        "Withdrawn applications cannot be updated."
                    );
                }

                if (application.Status == "Reviewed" &&
                    dto.Status == "Applied")
                {
                    throw new Exception(
                        "Reviewed applications cannot be moved back to Applied."
                    );
                }

                if (application.Status == "Shortlisted")
                {
                    throw new Exception(
                        "Shortlisted applications cannot be updated."
                    );
                }
                if (application.Status == "Rejected")
                {
                    throw new Exception(
                        "Rejected applications cannot be updated."
                    );
                }

                application.Status = dto.Status;

                application.Status = dto.Status;

                await _applicationRepository.UpdateApplicationAsync(application);


                var notification = new Notification
                {
                    Message = $"Your application for {application.Job?.JobTitle ?? "the job"} at {application.Job?.Employer?.CompanyName ?? "the company"} has been {dto.Status}.",
                    JobSeekerId = application.JobSeekerId,
                    CreatedDate = DateTime.Now,
                    IsRead = false
                };

                await _notificationRepository.AddAsync(notification);



                return _mapper.Map<ApplicationResponseDto>(application);

            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error updating application status {ApplicationId}",
                    applicationId);

                throw;
            }
        }

     

        public async Task<List<ApplicationResponseDto>> GetApplicationsByJobIdAsync(int jobId)

        {
            try
            {
                var applications =
                    await _applicationRepository
                        .GetApplicationsByJobIdAsync(jobId);

                return _mapper.Map<
                    List<ApplicationResponseDto>>
                    (applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error fetching applications for JobId {JobId}",
                    jobId);

                throw;
            }
        }

        public async Task<bool> WithdrawApplicationAsync(int applicationId)
        {
            try
            {
                _logger.LogInformation(
                    "Withdrawing application {ApplicationId}",
                    applicationId);

                var application = await _applicationRepository.GetApplicationByIdAsync(applicationId);

                if (application == null)
                {
                    return false;
                }
                if (application.Status != "Applied")
                {
                    throw new Exception(
                        "Only applications with Applied status can be withdrawn.");
                }

                application.Status = "Withdrawn";

                await _applicationRepository.UpdateApplicationAsync(application);


                _logger.LogInformation("Application withdrawn successfully. ApplicationId: {ApplicationId}",
                    applicationId);


                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error withdrawing application {ApplicationId}",
                    applicationId);

                throw;
            }
        }
    }
}
