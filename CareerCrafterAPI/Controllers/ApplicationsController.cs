using Asp.Versioning;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationsController(
            IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetAllApplications()
        {
            var applications =
                await _applicationService.GetAllApplicationsAsync();

            return Ok(applications);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetApplicationById(int id)
        {
            var application =
                await _applicationService.GetApplicationByIdAsync(id);

            if (application == null)
                return NotFound();

            return Ok(application);
        }

        [HttpPost]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> ApplyJob(ApplicationCreateDto dto)

        {
            var application =
                await _applicationService.AddApplicationAsync(dto);

            return CreatedAtAction(
                nameof(GetApplicationById),
                new { id = application.ApplicationId },
                application);
        }

        [HttpGet("jobseeker/{jobSeekerId}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> GetApplicationsByJobSeeker(int jobSeekerId)


        {
            var applications =
                await _applicationService
                    .GetApplicationsByJobSeekerIdAsync(
                        jobSeekerId);

            return Ok(applications);
        }



        [HttpPut("{id}/status")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> UpdateStatus(int id, ApplicationStatusUpdateDto dto)



        {
            var result =
                await _applicationService
                    .UpdateApplicationStatusAsync(
                        id,
                        dto);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("job/{jobId}")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetApplicationsByJob(int jobId)

        {
            var applications =
                await _applicationService
                    .GetApplicationsByJobIdAsync(jobId);

            return Ok(applications);
        }

        [HttpPut("{id}/withdraw")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> WithdrawApplication(int id)
        {
            var result =
                await _applicationService
                    .WithdrawApplicationAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok("Application withdrawn successfully");
        }
    }
}
