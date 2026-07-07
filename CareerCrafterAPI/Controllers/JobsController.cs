using Asp.Versioning;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.DTOs.Common;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }


        //[HttpGet]
        //public async Task<IActionResult> GetAllJobs()
        //{
        //    var jobs = await _jobService.GetAllJobsAsync();

        //    return Ok(jobs);
        //}
        [Authorize(Roles = "JobSeeker")]
        [HttpGet]
        public async Task<IActionResult> GetJobsPaged(
    int jobSeekerId,
    [FromQuery] PaginationDto pagination)
        {
            var jobs = await _jobService.GetJobsPagedAsync(
                jobSeekerId,
                pagination.PageNumber,
                pagination.PageSize,
                pagination.SortBy,
                pagination.Descending);

            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobById(int id)
        {
            var job = await _jobService.GetJobByIdAsync(id);

            if (job == null)
                return NotFound();

            return Ok(job);
        }

        [Authorize(Roles = "Employer")]
        [HttpPost]
        public async Task<IActionResult> CreateJob(JobCreateDto dto)
        {
            var job = await _jobService.AddJobAsync(dto);

            return CreatedAtAction(
                nameof(GetJobById),
                new { id = job.JobId },
                job);
        }

        [Authorize(Roles ="Employer")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, JobUpdateDto dto)


        {
            var job =
                await _jobService.UpdateJobAsync(id, dto);

            if (job == null)
                return NotFound();

            return Ok(job);
        }

        [Authorize(Roles ="Employer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var deleted =
                await _jobService.DeleteJobAsync(id);

            if (!deleted)
                return NotFound();

            return Ok("Job deleted successfully");
        }

        [HttpGet("search")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> SearchJobs(
            string? title,
            string? location)
        {
            var jobs =
                await _jobService.SearchJobsAsync(
                    title,
                    location);

            return Ok(jobs);
        }

        [HttpGet("recommend/{jobSeekerId}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> GetRecommendedJobs(int jobSeekerId)

        {
            var jobs =
                await _jobService
                .GetRecommendedJobsAsync(jobSeekerId);

            return Ok(jobs);
        }

        [Authorize(Roles = "Employer")]
        [HttpGet("employer/{employerId}")]
        public async Task<IActionResult> GetJobsByEmployer(int employerId)
        {
            var jobs = await _jobService.GetJobsByEmployerIdAsync(employerId);

            return Ok(jobs);
        }

        [Authorize(Roles = "Employer")]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreJob(int id)
        {
            var restored = await _jobService.RestoreJobAsync(id);

            if (!restored)
                return NotFound();

            return Ok("Job restored successfully");
        }

        [Authorize(Roles = "Employer")]
        [HttpGet("employer/{employerId}/archived")]
        public async Task<IActionResult> GetArchivedJobs(int employerId)
        {
            var jobs =
                await _jobService
                    .GetArchivedJobsByEmployerIdAsync(employerId);

            return Ok(jobs);
        }

    }
}
