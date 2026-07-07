using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
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
    public class EmployerServiceTests
    {
        private Mock<IEmployerRepository> _mockRepository;
        private Mock<IUserRepository> _mockUserRepository;
        private EmployerService _employerService;
        private Mock<IMapper> _mockMapper;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<EmployerService>>();
            _mockMapper = new Mock<IMapper>();
            _mockUserRepository = new Mock<IUserRepository>();
            _mockRepository = new Mock<IEmployerRepository>();

            _employerService = new EmployerService(
                _mockRepository.Object, 
                _mockUserRepository.Object,
                logger.Object,
                 _mockMapper.Object);

        }
        [Test]
        public async Task GetEmployerByIdAsync_ReturnsEmployer_WhenExists()
        {
            var employer = new Employer
            {
                EmployerId = 1,
                CompanyName = "Hexaware",
                CompanyDescription = "IT Services",
                UserId = 1
            };

            _mockRepository
                .Setup(r => r.GetEmployerByIdAsync(1))
                .ReturnsAsync(employer);

            _mockMapper.Setup(m => m.Map<EmployerResponseDto>(It.IsAny<Employer>())).Returns(new EmployerResponseDto
               {
                    EmployerId = 1,
                    CompanyName = "Hexaware",
                    CompanyDescription = "IT Services",
                    UserId = 1
                });

            var result = await _employerService.GetEmployerByIdAsync(1);


            Assert.IsNotNull(result);

            Assert.That(result.CompanyName,
                Is.EqualTo("Hexaware"));
        }
        [Test]
        public async Task GetEmployerByIdAsync_ReturnsNull_WhenEmployerIdNotFound()
        {
            _mockRepository
                .Setup(r => r.GetEmployerByIdAsync(100))
                .ReturnsAsync((Employer?)null);

            var result = await _employerService.GetEmployerByIdAsync(100);


            Assert.IsNull(result);
        }
        [Test]
        public async Task AddEmployerAsync_ReturnsCreatedEmployer()
        {
            var dto = new EmployerCreateDto
            {
                CompanyName = "ABC",
                CompanyDescription = "Consultancy",
                UserId = 1
            };

            _mockUserRepository.Setup(r => r.UserExistsAsync(1)).ReturnsAsync(true);



            _mockRepository
                .Setup(r => r.AddEmployerAsync(It.IsAny<Employer>()))
                .Returns(Task.CompletedTask);

            _mockMapper.Setup(m => m.Map<Employer>(It.IsAny<EmployerCreateDto>())).Returns(new Employer
                    {
                        CompanyName = "ABC",
                        CompanyDescription = "Consultancy",
                        UserId = 1
                    });

            _mockMapper.Setup(m => m.Map<EmployerResponseDto>(It.IsAny<Employer>())).Returns(new EmployerResponseDto
            {
                    CompanyName = "ABC",
                    CompanyDescription = "Consultancy",
                    UserId = 1
                });

            var result = await _employerService.AddEmployerAsync(dto);

            _mockRepository.Verify(r => r.AddEmployerAsync(It.IsAny<Employer>()), Times.Once);


            Assert.IsNotNull(result);

            Assert.That(result.CompanyName, Is.EqualTo("ABC"));
            

        }
        [Test]
        public void AddEmployerAsync_ThrowsException_WhenUserNotFound()
        {
            var dto = new EmployerCreateDto
            {
                CompanyName = "ABC",
                CompanyDescription = "Consultancy",
                UserId = 99
            };

            _mockUserRepository.Setup(r => r.UserExistsAsync(99))
                .ReturnsAsync(false);


            Assert.ThrowsAsync<Exception>(
                async () => await _employerService.AddEmployerAsync(dto));
        }

        [Test]
        public async Task GetAllEmployersAsync_ReturnsEmployers()
        {
            var employers = new List<Employer>
            {
            new Employer
            {
                EmployerId = 1,
                CompanyName = "Hexaware"
            }
        };

            _mockRepository
                .Setup(r => r.GetAllEmployersAsync())
                .ReturnsAsync(employers);

            _mockMapper
                .Setup(m => m.Map<List<EmployerResponseDto>>(It.IsAny<List<Employer>>()))
                .Returns(new List<EmployerResponseDto>
                {
            new EmployerResponseDto
            {
                EmployerId = 1,
                CompanyName = "Hexaware"
            }
                });

            var result =
                await _employerService.GetAllEmployersAsync();

            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
        }
        [Test]
        public async Task GetDashboardAsync_ReturnsDashboard()
        {
            var dashboard = new EmployerDashboardDto
            {
                TotalJobsPosted = 5,
                TotalApplications = 20,
                AppliedCount = 10,
                ShortlistedCount = 5,
                RejectedCount = 5
            };

            _mockRepository
                .Setup(r => r.GetDashboardAsync(1))
                .ReturnsAsync(dashboard);

            var result =
                await _employerService.GetDashboardAsync(1);

            Assert.IsNotNull(result);
            Assert.That(result.TotalJobsPosted, Is.EqualTo(5));
        }
        [Test]
        public async Task GetCandidateProfileAsync_ReturnsCandidate()
        {
            var candidate = new CandidateProfileDto
            {
                JobSeekerId = 1,
                FullName = "Priya",
                Skills = "C#, SQL"
            };

            _mockRepository
                .Setup(r => r.GetCandidateProfileAsync(1))
                .ReturnsAsync(candidate);

            var result =
                await _employerService
                    .GetCandidateProfileAsync(1);

            Assert.IsNotNull(result);
            Assert.That(result.FullName, Is.EqualTo("Priya"));
        }

        [Test]
        public async Task UpdateEmployerAsync_ReturnsUpdatedEmployer()
        {
            var employer = new Employer
            {
                EmployerId = 1,
                CompanyName = "ABC",
                CompanyDescription = "Old Description",
                UserId = 1
            };

            var dto = new EmployerUpdateDto
            {
                CompanyName = "Hexaware",
                CompanyDescription = "IT Services"
            };

            _mockRepository
                .Setup(r => r.GetEmployerByIdAsync(1))
                .ReturnsAsync(employer);

            _mockMapper
                .Setup(m => m.Map(dto, employer));

            _mockRepository
                .Setup(r => r.UpdateEmployerAsync(employer))
                .Returns(Task.CompletedTask);

            _mockMapper
                .Setup(m => m.Map<EmployerResponseDto>(employer))
                .Returns(new EmployerResponseDto
                {
                    EmployerId = 1,
                    CompanyName = "Hexaware",
                    CompanyDescription = "IT Services",
                    UserId = 1
                });

            var result =
                await _employerService.UpdateEmployerAsync(1, dto);

            Assert.IsNotNull(result);

            Assert.That(result.CompanyName,
                Is.EqualTo("Hexaware"));

            _mockRepository.Verify(
                r => r.UpdateEmployerAsync(It.IsAny<Employer>()),
                Times.Once);
        }

        [Test]
        public async Task UpdateEmployerAsync_ReturnsNull_WhenEmployerNotFound()
        {
            var dto = new EmployerUpdateDto
            {
                CompanyName = "Updated Company",
                CompanyDescription = "Updated Description"
            };

            _mockRepository
                .Setup(r => r.GetEmployerByIdAsync(100))
                .ReturnsAsync((Employer?)null);

            var result =
                await _employerService.UpdateEmployerAsync(100, dto);

            Assert.IsNull(result);

            _mockRepository.Verify(
                r => r.UpdateEmployerAsync(It.IsAny<Employer>()),
                Times.Never);
        }

    }
}
