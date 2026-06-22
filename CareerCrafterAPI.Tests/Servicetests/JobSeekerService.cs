using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Implementations;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Implementations;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CareerCrafterAPI.Tests.Servicetests
{
    public class JobSeekerTests
    {
        private Mock<IJobSeekerRepository> _mockRepository;
        private Mock<IUserRepository> _mockUserRepository;
        private Mock<IMapper> _mockMapper;
        private JobSeekerService _jobSeekerService;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<JobSeekerService>>();
            _mockRepository = new Mock<IJobSeekerRepository>();
            _mockUserRepository = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();

            _jobSeekerService = new JobSeekerService(_mockRepository.Object,
                    _mockUserRepository.Object,
                     logger.Object,
                      _mockMapper.Object);


        }
        [Test]
        public async Task GetJobSeekerByIdAsync_ReturnsJobSeeker_WhenExists()
        {
            var jobSeeker = new JobSeeker
            {
                JobSeekerId = 1,
                Phone = "9876543210",
                Address = "Chennai",
                Skills = "C#,SQL",
                ExperienceYears = 2,
                UserId = 1
            };

            _mockRepository
                .Setup(r => r.GetJobSeekerByIdAsync(1))
                .ReturnsAsync(jobSeeker);


            _mockMapper
        .Setup(m => m.Map<JobSeekerResponseDto>(It.IsAny<JobSeeker>()))
        .Returns(new JobSeekerResponseDto
        {
            JobSeekerId = 1,
            Phone = "9876543210",
            Address = "Chennai",
            Skills = "C#,SQL",
            ExperienceYears = 2,
            UserId = 1
        });

            var result = await _jobSeekerService.GetJobSeekerByIdAsync(1);


            Assert.IsNotNull(result);

            Assert.That(result.Phone,
                Is.EqualTo("9876543210"));
        }
        [Test]
        public async Task GetJobSeekerByIdAsync_ReturnsNull_WhenNotFound()
        {
            _mockRepository
                .Setup(r => r.GetJobSeekerByIdAsync(100))
                .ReturnsAsync((JobSeeker?)null);

            var result =
                await _jobSeekerService.GetJobSeekerByIdAsync(100);

            Assert.IsNull(result);
        }
        [Test]
        public async Task AddJobSeekerAsync_ReturnsCreatedJobSeeker()
        {
            var dto = new JobSeekerCreateDto
            {
                Phone = "9876543210",
                Address = "Chennai",
                Skills = "C#,SQL",
                ExperienceYears = 2,
                UserId = 1
            };

            _mockUserRepository
                .Setup(r => r.UserExistsAsync(1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.AddJobSeekerAsync(It.IsAny<JobSeeker>()))
                .Returns(Task.CompletedTask);


            _mockMapper
        .Setup(m => m.Map<JobSeeker>(It.IsAny<JobSeekerCreateDto>()))
        .Returns(new JobSeeker
        {
            Phone = "9876543210",
            Address = "Chennai",
            Skills = "C#,SQL",
            ExperienceYears = 2,
            UserId = 1
        });

            _mockMapper
                .Setup(m => m.Map<JobSeekerResponseDto>(It.IsAny<JobSeeker>()))
                .Returns(new JobSeekerResponseDto
                {
                    Phone = "9876543210",
                    Address = "Chennai",
                    Skills = "C#,SQL",
                    ExperienceYears = 2,
                    UserId = 1
                });

            var result =
                await _jobSeekerService.AddJobSeekerAsync(dto);

            Assert.IsNotNull(result);

            Assert.That(result.Phone, Is.EqualTo("9876543210"));

            _mockRepository.Verify(r => r.AddJobSeekerAsync(It.IsAny<JobSeeker>()),
        Times.Once);

        }
        [Test]
        public void AddJobSeekerAsync_ThrowsException_WhenUserNotFound()
        {
            var dto = new JobSeekerCreateDto
            {
                Phone = "9876543210",
                Address = "Chennai",
                Skills = "C#,SQL",
                ExperienceYears = 2,
                UserId = 90
            };

            _mockUserRepository
                .Setup(r => r.UserExistsAsync(90))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<Exception>(
                async () => await _jobSeekerService.AddJobSeekerAsync(dto));
        }

        [Test]
        public async Task GetAllJobSeekersAsync_ReturnsJobSeekers()
        {
            var seekers = new List<JobSeeker>
    {
        new JobSeeker
        {
            JobSeekerId = 1,
            Phone = "9876543210"
        }
    };

            _mockRepository
                .Setup(r => r.GetAllJobSeekersAsync())
                .ReturnsAsync(seekers);

            _mockMapper
                .Setup(m => m.Map<List<JobSeekerResponseDto>>(It.IsAny<List<JobSeeker>>()))
                .Returns(new List<JobSeekerResponseDto>
                {
            new JobSeekerResponseDto
            {
                JobSeekerId = 1,
                Phone = "9876543210"
            }
                });

            var result =
                await _jobSeekerService.GetAllJobSeekersAsync();

            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
        }
    }
}
