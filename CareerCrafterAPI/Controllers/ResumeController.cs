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

    public class ResumesController : ControllerBase
    {
        private readonly IResumeService _resumeService;


        public ResumesController(IResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpGet]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetAllResumes()
        {
            var resumes = await _resumeService.GetAllResumesAsync();

            return Ok(resumes);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetResumeById(int id)
        {
            var resume = await _resumeService.GetResumeByIdAsync(id);

            if (resume == null)
                return NotFound();

            return Ok(resume);
        }


        [HttpPost]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> UploadResume(
    [FromForm] ResumeUploadDto dto)
        {
            var result =
                await _resumeService.UploadResumeAsync(dto);

            return CreatedAtAction(
                nameof(GetResumeById),
                new { id = result.ResumeId },
                result);
        }



        [Authorize(Roles = "JobSeeker")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResume(
    int id,
    [FromForm] ResumeUpdateDto dto)
        {
            var updatedResume =
                await _resumeService.UpdateResumeAsync(id, dto);

            if (updatedResume == null)
                return NotFound();

            return Ok(updatedResume);
        }


        [Authorize(Roles = "JobSeeker")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResume(int id)
        {
            var deleted =
                await _resumeService.DeleteResumeAsync(id);

            if (!deleted)
                return NotFound();

            return Ok("Resume deleted successfully");
        }
        [Authorize(Roles = "JobSeeker")]
        [HttpGet("jobseeker/{jobSeekerId}")]
        public async Task<IActionResult> GetResumeByJobSeeker(int jobSeekerId)
        {
            var resumes =
                await _resumeService.GetResumeByJobSeekerIdAsync(jobSeekerId);

            return Ok(resumes);
        }

        //    [HttpPut("{id}")]
        //    [Authorize(Roles = "JobSeeker")]
        //    public async Task<IActionResult> UpdateResume(
        //int id,
        //[FromForm] ResumeUpdateDto dto)
        //    {
        //        var updatedResume =
        //            await _resumeService.UpdateResumeAsync(id, dto);

        //        if (updatedResume == null)
        //            return NotFound();

        //        return Ok(updatedResume);
    }
    }

