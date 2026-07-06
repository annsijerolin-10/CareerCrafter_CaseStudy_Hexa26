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

    public class JobSeekersController : ControllerBase
    {
        private readonly IJobSeekerService _jobSeekerService;

        public JobSeekersController(IJobSeekerService jobSeekerService)
        {
            _jobSeekerService = jobSeekerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllJobSeekers()
        {
            var jobSeekers = await _jobSeekerService.GetAllJobSeekersAsync();

            return Ok(new
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Job Seekers retrieved successfully",
                Data = jobSeekers
            });
        }
        [Authorize(Roles = "JobSeeker")]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetJobSeekerById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Invalid Job Seeker Id"
                });
            }

            var jobSeeker = await _jobSeekerService.GetJobSeekerByIdAsync(id);

            if (jobSeeker == null)
            {
                return NotFound(new
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "Job Seeker not found"
                });
            }

            return Ok(new
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Job Seeker retrieved successfully",
                Data = jobSeeker
            });
        }

        [HttpPost]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> CreateJobSeeker(JobSeekerCreateDto dto)

        {
            var createdJobSeeker = await _jobSeekerService.AddJobSeekerAsync(dto);


            return CreatedAtAction(
                nameof(GetJobSeekerById),
                new { id = createdJobSeeker.JobSeekerId },
                new
                {
                    StatusCode = StatusCodes.Status201Created,
                    Message = "Job Seeker created successfully",
                    Data = createdJobSeeker
                });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> UpdateJobSeeker(
            int id,
            JobSeekerUpdateDto dto)
        {
            var jobSeeker = await _jobSeekerService.UpdateJobSeekerAsync(id, dto);



            if (jobSeeker == null)
            {
                return NotFound();
            }

            return Ok(jobSeeker);
        }

        [HttpGet("{id}/dashboard")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> GetDashboard(int id)
        {
            var dashboard =
                await _jobSeekerService.GetDashboardAsync(id);

            return Ok(dashboard);
        }
    }
}