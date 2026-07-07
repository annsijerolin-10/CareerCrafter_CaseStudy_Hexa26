using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Implementations;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CareerCrafterAPI.Tests.Servicetests
{
    public class ApplicationServiceTests
    {
        private Mock<IApplicationRepository> _mockRepository;
        private Mock<INotificationRepository> _mockNotificationRepository;
        private ApplicationService _applicationService;
        private Mock<IMapper> _mockMapper;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<ApplicationService>>();
            _mockMapper = new Mock<IMapper>();
            _mockNotificationRepository = new Mock<INotificationRepository>();
            _mockRepository = new Mock<IApplicationRepository>();
            _applicationService = new ApplicationService(
                     _mockRepository.Object,
                     logger.Object,
                     _mockMapper.Object,
                     _mockNotificationRepository.Object);

        }
        [Test]
        public async Task GetApplicationByIdAsync_ReturnsApplication_WhenExists()
        {
            var application = new Application
            {
                ApplicationId = 1,
                JobId = 1,
                JobSeekerId = 1,
                Status = "Applied",
                ApplicationDate = DateTime.Now,
            
            JobSeeker = new JobSeeker
            {
                JobSeekerId = 1,
                User = new User
                {
                    UserId = 1,
                    FullName = "Priya"
                }
            }
            };


            _mockRepository.Setup(r => r.GetApplicationByIdAsync(1))
                    .ReturnsAsync(application);

            _mockMapper.Setup(m => m.Map<ApplicationResponseDto>(It.IsAny<Application>())).
                Returns(new ApplicationResponseDto
                {
                    ApplicationId = 1,
                    JobId = 1,
                    JobSeekerId = 1,
                    Status = "Applied",
                    JobSeekerName = "Priya"
    });
            var result =
                await _applicationService.GetApplicationByIdAsync(1);

            Assert.IsNotNull(result);

            Assert.That(result.ApplicationId, Is.EqualTo(1));


            Assert.That(result.JobSeekerName, Is.EqualTo("Priya"));

        }
        [Test]
        public async Task GetApplicationByIdAsync_ReturnsNull_WhenNotFound()
        {
            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(50))
                .ReturnsAsync((Application?)null);

            var result = await _applicationService.GetApplicationByIdAsync(50);


            Assert.IsNull(result);
        }



        [Test]
        public async Task AddApplicationAsync_ReturnsCreatedApplication()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 1,
                JobSeekerId = 1,
                ResumeId = 1
            };

            var job = new Job
            {
                JobId = 1,
                JobTitle = "Software Developer",
                ApplicationDeadline = DateTime.Today.AddDays(5)
            };

            var application = new Application
            {
                ApplicationId = 1,
                JobId = 1,
                JobSeekerId = 1,
                Status = "Applied"
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(1, 1))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.ResumeBelongsToJobSeekerAsync(1, 1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.JobExistsAsync(1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.GetJobByIdAsync(1))
                .ReturnsAsync(job);

            _mockRepository
                .Setup(r => r.JobSeekerExistsAsync(1))
                .ReturnsAsync(true);

            _mockMapper
                .Setup(m => m.Map<Application>(dto))
                .Returns(application);

            _mockRepository
                .Setup(r => r.AddApplicationAsync(It.IsAny<Application>()))
                .Callback<Application>(a => a.ApplicationId = 1)
                .Returns(Task.CompletedTask);

            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(1))
                .ReturnsAsync(application);

            _mockMapper
                .Setup(m => m.Map<ApplicationResponseDto>(application))
                .Returns(new ApplicationResponseDto
                {
                    ApplicationId = 1,
                    JobId = 1,
                    JobSeekerId = 1,
                    Status = "Applied"
                });

            var result =
                await _applicationService.AddApplicationAsync(dto);

            Assert.IsNotNull(result);

            Assert.That(result.ApplicationId, Is.EqualTo(1));

            Assert.That(result.Status, Is.EqualTo("Applied"));
        }


        [Test]
        public void AddApplicationAsync_ThrowsException_WhenJobNotFound()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 90,
                JobSeekerId = 1,
                ResumeId = 1
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(90, 1))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.ResumeBelongsToJobSeekerAsync(1, 1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.JobExistsAsync(90))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<Exception>(
                async () => await _applicationService.AddApplicationAsync(dto));

            _mockRepository.Verify(
                r => r.AddApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }



        [Test]
        public void AddApplicationAsync_ThrowsException_WhenJobSeekerNotFound()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 1,
                JobSeekerId = 99,
                ResumeId = 1
            };

            var job = new Job
            {
                JobId = 1,
                ApplicationDeadline = DateTime.Today.AddDays(10)
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(1, 99))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.ResumeBelongsToJobSeekerAsync(1, 99))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.JobExistsAsync(1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.GetJobByIdAsync(1))
                .ReturnsAsync(job);

            _mockRepository
                .Setup(r => r.JobSeekerExistsAsync(99))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<Exception>(
                async () => await _applicationService.AddApplicationAsync(dto));

            _mockRepository.Verify(
                r => r.AddApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }

        [Test]
        public void AddApplicationAsync_ThrowsException_WhenAlreadyApplied()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 1,
                JobSeekerId = 1,
                ResumeId = 1
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(1, 1))
                .ReturnsAsync(true);

            Assert.ThrowsAsync<Exception>(async () =>
                await _applicationService.AddApplicationAsync(dto));

            _mockRepository.Verify(
                r => r.AddApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }

        [Test]
        public void AddApplicationAsync_ThrowsException_WhenResumeIsInvalid()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 1,
                JobSeekerId = 1,
                ResumeId = 10
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(1, 1))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.ResumeBelongsToJobSeekerAsync(10, 1))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<Exception>(async () =>
                await _applicationService.AddApplicationAsync(dto));

            _mockRepository.Verify(
                r => r.AddApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }

        [Test]
        public void AddApplicationAsync_ThrowsException_WhenDeadlineHasPassed()
        {
            var dto = new ApplicationCreateDto
            {
                JobId = 1,
                JobSeekerId = 1,
                ResumeId = 1
            };

            var job = new Job
            {
                JobId = 1,
                ApplicationDeadline = DateTime.Today.AddDays(-1)
            };

            _mockRepository
                .Setup(r => r.HasAlreadyAppliedAsync(1, 1))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.ResumeBelongsToJobSeekerAsync(1, 1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.JobExistsAsync(1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.GetJobByIdAsync(1))
                .ReturnsAsync(job);

            Assert.ThrowsAsync<Exception>(async () =>
                await _applicationService.AddApplicationAsync(dto));

            _mockRepository.Verify(
                r => r.AddApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }

        [Test]
        public async Task GetAllApplicationsAsync_ReturnsApplications()
        {
            var applications = new List<Application>
            {
                new Application
                {
                    ApplicationId = 1,
                    JobId = 1,
                    JobSeekerId = 1
                }
            };

            _mockRepository
                .Setup(r => r.GetAllApplicationsAsync())
                .ReturnsAsync(applications);

            _mockMapper
                .Setup(m => m.Map<List<ApplicationResponseDto>>(It.IsAny<List<Application>>()))
                .Returns(new List<ApplicationResponseDto>
                {
            new ApplicationResponseDto
            {
                ApplicationId = 1,
                JobId = 1,
                JobSeekerId = 1
            }
                });

            var result =
                await _applicationService.GetAllApplicationsAsync();

            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));
        }
        [Test]
        public async Task GetApplicationsByJobSeekerIdAsync_ReturnsApplications()
        {
            var applications = new List<Application>
            {
                new Application
                {
                    ApplicationId = 1,
                    JobId = 1,
                    JobSeekerId = 2
                }
            };

            _mockRepository
                .Setup(r => r.GetApplicationsByJobSeekerIdAsync(2))
                .ReturnsAsync(applications);

            _mockMapper
                .Setup(m => m.Map<List<ApplicationResponseDto>>
                    (It.IsAny<List<Application>>()))
                .Returns(new List<ApplicationResponseDto>
                {
                    new ApplicationResponseDto
                    {
                        ApplicationId = 1,
                        JobId = 1,
                        JobSeekerId = 2
                    }
                });

            var result = await _applicationService.GetApplicationsByJobSeekerIdAsync(2);



            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));
        }
        [Test]
        public async Task GetApplicationsByJobIdAsync_ReturnsApplications()
        {
            var applications = new List<Application>
    {
        new Application
        {
            ApplicationId = 1,
            JobId = 10,
            JobSeekerId = 2
        }
    };

            _mockRepository
                .Setup(r => r.GetApplicationsByJobIdAsync(10))
                .ReturnsAsync(applications);

            _mockMapper
                .Setup(m => m.Map<List<ApplicationResponseDto>>
                    (It.IsAny<List<Application>>()))
                .Returns(new List<ApplicationResponseDto>
                {
            new ApplicationResponseDto
            {
                ApplicationId = 1,
                JobId = 10,
                JobSeekerId = 2
            }
                });

            var result = await _applicationService.GetApplicationsByJobIdAsync(10);



            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));
        }
        [Test]
        public async Task UpdateApplicationStatusAsync_UpdatesStatus()
        {
            var application = new Application
            {
                ApplicationId = 1,
                JobId = 1,
                JobSeekerId = 2,
                Status = "Applied"
            };

            var dto = new ApplicationStatusUpdateDto
            {
                Status = "Shortlisted"
            };

            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(1))
                .ReturnsAsync(application);

            _mockRepository
                .Setup(r => r.UpdateApplicationAsync(It.IsAny<Application>()))
                .Returns(Task.CompletedTask);

            _mockNotificationRepository
                .Setup(n => n.AddAsync(It.IsAny<Notification>()))
                .Returns(Task.CompletedTask);

            _mockMapper
                .Setup(m => m.Map<ApplicationResponseDto>
                (It.IsAny<Application>()))
                .Returns(new ApplicationResponseDto
                {
                    ApplicationId = 1,
                    Status = "Shortlisted"
                });

            var result = await _applicationService.UpdateApplicationStatusAsync(1, dto);



            Assert.IsNotNull(result);

            Assert.That(result.Status, Is.EqualTo("Shortlisted"));



            _mockRepository.Verify(r => r.UpdateApplicationAsync(
                    It.IsAny<Application>()),
                    Times.Once);


            _mockNotificationRepository.Verify(n => n.AddAsync(
                    It.IsAny<Notification>()),
                    Times.Once);

        }
        [Test]
        public async Task UpdateApplicationStatusAsync_ReturnsNull_WhenApplicationNotFound()
        {
            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(60))
                .ReturnsAsync((Application?)null);

            var dto = new ApplicationStatusUpdateDto
            {
                Status = "Rejected"
            };

            var result = await _applicationService.UpdateApplicationStatusAsync(60, dto);



            Assert.IsNull(result);

            _mockRepository.Verify(r => r.UpdateApplicationAsync(
                    It.IsAny<Application>()),
                    Times.Never);


            _mockNotificationRepository.Verify(n => n.AddAsync(
                    It.IsAny<Notification>()),
                    Times.Never);

        }

        [Test]
        public async Task WithdrawApplicationAsync_ReturnsTrue_WhenApplicationExists()
        {
            var application = new Application
            {
                ApplicationId = 1,
                Status = "Applied"
            };

            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(1))
                .ReturnsAsync(application);

            _mockRepository
                .Setup(r => r.UpdateApplicationAsync(It.IsAny<Application>()))
                .Returns(Task.CompletedTask);

            var result =
                await _applicationService.WithdrawApplicationAsync(1);

            Assert.IsTrue(result);

            Assert.That(application.Status, Is.EqualTo("Withdrawn"));

            _mockRepository.Verify(
                r => r.UpdateApplicationAsync(It.IsAny<Application>()),
                Times.Once);
        }

        [Test]
        public void WithdrawApplicationAsync_ThrowsException_WhenStatusIsNotApplied()
        {
            var application = new Application
            {
                ApplicationId = 1,
                Status = "Rejected"
            };

            _mockRepository
                .Setup(r => r.GetApplicationByIdAsync(1))
                .ReturnsAsync(application);

            Assert.ThrowsAsync<Exception>(async () =>
                await _applicationService.WithdrawApplicationAsync(1));

            _mockRepository.Verify(
                r => r.UpdateApplicationAsync(It.IsAny<Application>()),
                Times.Never);
        }


    }
}