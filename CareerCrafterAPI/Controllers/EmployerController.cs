using Asp.Versioning;
using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerCrafterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _employerService;
      

        public EmployerController(IEmployerService employerService)
        {
            _employerService = employerService;
        }

        [HttpGet]
       // [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetAllEmployers()
        {
            var employers = await _employerService.GetAllEmployersAsync();

            return Ok(employers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployerById(int id)
        {
            var employer = await _employerService.GetEmployerByIdAsync(id);

            if (employer == null)
            {
                return NotFound();
            }

            return Ok(employer);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployer(EmployerCreateDto dto)

        {
            var employer = await _employerService.AddEmployerAsync(dto);


            return CreatedAtAction(
                nameof(GetEmployerById),
                new { id = employer.EmployerId },
                new
                {
                    StatusCode = StatusCodes.Status201Created,
                    Message = "Employer created successfully",
                    Data = employer
                });
        }

        [HttpGet("{id}/dashboard")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetDashboard(int id)

        {
            var dashboard = await _employerService.GetDashboardAsync(id);



            return Ok(dashboard);
        }



        [HttpGet("candidate/{jobSeekerId}")]
        [Authorize(Roles = "Employer")]
        public async Task<IActionResult> GetCandidateProfile(int jobSeekerId)

        {
            var candidate =
                await _employerService.GetCandidateProfileAsync(jobSeekerId);


            if (candidate == null)
                return NotFound();

            return Ok(candidate);
        }


      
    }
}
