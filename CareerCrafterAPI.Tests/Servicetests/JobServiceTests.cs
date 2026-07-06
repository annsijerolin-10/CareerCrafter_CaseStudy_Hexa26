//using AutoMapper;
//using CareerCrafterAPI.DTOs;
//using CareerCrafterAPI.Models;
//using CareerCrafterAPI.Repositories.Interfaces;
//using CareerCrafterAPI.Services.Implementations;
//using Microsoft.Extensions.Logging;
//using Microsoft.Identity.Client;
//using Moq;
//using NUnit.Framework;

//namespace CareerCrafterAPI.Tests.Servicetests
//{
//    public class JobServiceTests
//    {
//        private Mock<IJobRepository> _mockRepository;
//        private Mock<IJobSeekerRepository> _mockJobSeekerRepository;
//        private JobService _jobService;
//        private Mock<IMapper> _mockMapper;
//        [SetUp]
//        public void Setup()
//        {
//            var logger = new Mock<ILogger<JobService>>();

//            _mockRepository = new Mock<IJobRepository>();
//            _mockJobSeekerRepository = new Mock<IJobSeekerRepository>();
//            _mockMapper = new Mock<IMapper>();

//            _jobService = new JobService(
//                _mockRepository.Object,
//                _mockJobSeekerRepository.Object,
//                logger.Object,
//                _mockMapper.Object);
//        }

//        [Test]
//        public async Task GetJobByIdAsync_ReturnJob_WhenJobExists()
//        {
//            var job = new Job
//            {
//                JobId = 1,
//                JobTitle = "DotNet Developer",
//                JobDescription = "ASP.NET Core",
//                Location = "Chennai",
//                Salary = 800000,
//                EmployerId = 1

//            };
//            _mockMapper
//    .Setup(m => m.Map<JobResponseDto>(It.IsAny<Job>()))
//    .Returns(new JobResponseDto
//    {
//        JobId = 1,
//        JobTitle = "DotNet Developer"
//    });
//            _mockRepository.Setup(r => r.GetJobByIdAsync(1)).ReturnsAsync(job);
//            var result = await _jobService.GetJobByIdAsync(1);


//            Assert.IsNotNull(result);

//            Assert.That(result.JobTitle,
//                Is.EqualTo("DotNet Developer"));
//        }
//        [Test]
//        public async Task GetJobByIdAsync_ReturnsNull_WhenJobNotFound()
//        {

//            //        _mockMapper
//            //.Setup(m => m.Map<Job>(It.IsAny<JobCreateDto>()))
//            //.Returns(new Job
//            //{
//            //    JobTitle = "React Developer",
//            //    EmployerId = 1
//            //});

//            //        _mockMapper
//            //            .Setup(m => m.Map<JobResponseDto>(It.IsAny<Job>()))
//            //            .Returns(new JobResponseDto
//            //            {
//            //                JobTitle = "React Developer"
//            //            });
//            _mockRepository.Setup(r => r.GetJobByIdAsync(100))
//                .ReturnsAsync((Job?)null);


//            var result = await _jobService.GetJobByIdAsync(100);
//            Assert.IsNull(result);


//        }
//        [Test]
//        public async Task AddJobAsync_ReturnsCreatedJob()
//        {
//            var dto = new JobCreateDto
//            {
//                JobTitle = "React Developer",
//                JobDescription = "Frontend",
//                Location = "Bangalore",
//                Salary = 700000,
//                EmployerId = 1
//            };


//            _mockRepository.Setup(r => r.EmployerExistsAsync(1))
//                .ReturnsAsync(true);
//            _mockRepository.Setup(r => r.AddJobAsync(It.IsAny<Job>()))
//                  .Returns(Task.CompletedTask);


//            _mockMapper
//    .Setup(m => m.Map<Job>(It.IsAny<JobCreateDto>()))
//    .Returns(new Job
//    {
//        JobTitle = "React Developer",
//        EmployerId = 1
//    });

//            _mockMapper
//                .Setup(m => m.Map<JobResponseDto>(It.IsAny<Job>()))
//                .Returns(new JobResponseDto
//                {
//                    JobTitle = "React Developer"
//                });

//            var result = await _jobService.AddJobAsync(dto);


//            Assert.IsNotNull(result);

//            Assert.That(result.JobTitle,
//                Is.EqualTo("React Developer"));

//            _mockRepository.Verify(
//                r => r.AddJobAsync(It.IsAny<Job>()),
//                Times.Once);
//        }
//        [Test]
//        public void AddJobAsync_ThrowsException_WhenEmployerNotFound()
//        {
//            var dto = new JobCreateDto
//            {
//                JobTitle = "React Developer",
//                JobDescription = "Frontend",
//                Location = "Bangalore",
//                Salary = 700000,
//                EmployerId = 999
//            };

//            _mockRepository
//                .Setup(r => r.EmployerExistsAsync(999))
//                .ReturnsAsync(false);

//            Assert.ThrowsAsync<Exception>(
//                async () => await _jobService.AddJobAsync(dto));
//        }
//        [Test]
//        public async Task UpdateJobAsync_ReturnsUpdatedJob()
//        {
//            var existingJob = new Job
//            {
//                JobId = 1,
//                JobTitle = "Old Title",
//                JobDescription = "Old Description",
//                Location = "Chennai",
//                Salary = 500000,
//                EmployerId = 1
//            };

//            var dto = new JobUpdateDto
//            {
//                JobTitle = "New Title",
//                JobDescription = "New Description",
//                Location = "Bangalore",
//                Salary = 800000
//            };

//            _mockMapper
//    .Setup(m => m.Map(It.IsAny<JobUpdateDto>(), It.IsAny<Job>()))
//    .Callback<JobUpdateDto, Job>((dto, job) =>
//    {
//        job.JobTitle = dto.JobTitle;
//        job.JobDescription = dto.JobDescription;
//        job.Location = dto.Location;
//        job.Salary = dto.Salary;
//    });

//            _mockMapper
//                .Setup(m => m.Map<JobResponseDto>(It.IsAny<Job>()))
//                .Returns(new JobResponseDto
//                {
//                    JobTitle = "New Title",
//                    Location = "Bangalore"
//                });

//            _mockRepository
//                .Setup(r => r.GetJobByIdAsync(1))
//                .ReturnsAsync(existingJob);

//            _mockRepository
//                .Setup(r => r.UpdateJobAsync(It.IsAny<Job>()))
//                .Returns(Task.CompletedTask);

//            var result =
//                await _jobService.UpdateJobAsync(1, dto);

//            Assert.IsNotNull(result);

//            Assert.That(result.JobTitle, Is.EqualTo("New Title"));


//            Assert.That(result.Location, Is.EqualTo("Bangalore"));


//            _mockRepository.Verify(r => r.UpdateJobAsync(It.IsAny<Job>()), Times.Once);


//        }
//        [Test]
//        public async Task UpdateJobAsync_ReturnsNull_WhenJobNotFound()
//        {
//            _mockRepository
//                .Setup(r => r.GetJobByIdAsync(999))
//                .ReturnsAsync((Job?)null);

//            var dto = new JobUpdateDto
//            {
//                JobTitle = "New Title",
//                JobDescription = "New Description",
//                Location = "Bangalore",
//                Salary = 800000
//            };

//            var result = await _jobService.UpdateJobAsync(999, dto);
//            Assert.IsNull(result);
//        }


//        [Test]
//        public async Task DeleteJobAsync_ReturnsTrue_WhenDeleted()
//        {
//            var job = new Job
//            {
//                JobId = 1,
//                JobTitle = "DotNet Developer"
//            };

//            _mockRepository
//                .Setup(r => r.GetJobByIdAsync(1))
//                .ReturnsAsync(job);

//            _mockRepository
//                .Setup(r => r.DeleteJobAsync(job))
//                .Returns(Task.CompletedTask);

//            var result =
//                await _jobService.DeleteJobAsync(1);

//            Assert.IsTrue(result);

//            _mockRepository.Verify(
//                r => r.DeleteJobAsync(It.IsAny<Job>()),
//                Times.Once);
//        }

//        [Test]
//        public async Task DeleteJobAsync_ReturnsFalse_WhenJobNotFound()
//        {
//            _mockRepository
//                .Setup(r => r.GetJobByIdAsync(99))
//                .ReturnsAsync((Job?)null);

//            var result = await _jobService.DeleteJobAsync(99);


//            Assert.IsFalse(result);
//        }
//        [Test]
//        public async Task GetJobsPagedAsync_ReturnsJobs()
//        {
//            var jobs = new List<Job>
//    {
//        new Job
//        {
//            JobId = 1,
//            JobTitle = "DotNet Developer"
//        }
//    };

//            _mockRepository
//                .Setup(r => r.GetJobsPagedAsync(1, 10,null,false))
//                .ReturnsAsync(jobs);

//            _mockMapper
//                .Setup(m => m.Map<List<JobResponseDto>>(It.IsAny<List<Job>>()))
//                .Returns(new List<JobResponseDto>
//                {
//            new JobResponseDto
//            {
//                JobId = 1,
//                JobTitle = "DotNet Developer"
//            }
//                });

//            var result =
//                await _jobService.GetJobsPagedAsync(1, 10,null,false);

//            Assert.IsNotNull(result);
//            Assert.That(result.Count, Is.EqualTo(1));
//        }
//        [Test]
//        public async Task SearchJobsAsync_ReturnsMatchingJobs()
//        {
//            var jobs = new List<Job>
//    {
//        new Job
//        {
//            JobId = 1,
//            JobTitle = "DotNet Developer",
//            Location = "Chennai"
//        }
//    };

//            _mockRepository
//                .Setup(r => r.SearchJobsAsync(
//                    "DotNet",
//                    "Chennai"))
//                .ReturnsAsync(jobs);

//            _mockMapper
//                .Setup(m => m.Map<List<JobResponseDto>>(
//                    It.IsAny<List<Job>>()))
//                .Returns(new List<JobResponseDto>
//                {
//            new JobResponseDto
//            {
//                JobId = 1,
//                JobTitle = "DotNet Developer"
//            }
//                });

//            var result =
//                await _jobService.SearchJobsAsync(
//                    "DotNet",
//                    "Chennai");

//            Assert.IsNotNull(result);

//            Assert.That(result.Count, Is.EqualTo(1));

//            Assert.That(
//                result[0].JobTitle,
//                Is.EqualTo("DotNet Developer"));
//        }
//        [Test]
//        public async Task GetRecommendedJobsAsync_ReturnsRecommendedJobs()
//        {
//            var jobSeeker = new JobSeeker
//            {
//                JobSeekerId = 1,
//                Skills = "C#,SQL"
//            };

//            var jobs = new List<Job> { 
//                new Job
//                {
//                    JobId = 1,
//                    JobTitle = "DotNet Developer",
//                    RequiredSkills = "C#,SQL"
//                }
//            };

//            _mockJobSeekerRepository
//                .Setup(r => r.GetJobSeekerByIdAsync(1))
//                .ReturnsAsync(jobSeeker);

//            _mockRepository
//                .Setup(r => r.GetRecommendedJobsAsync("C#,SQL"))
//                .ReturnsAsync(jobs);

//            _mockMapper
//                .Setup(m => m.Map<List<JobResponseDto>>(
//                    It.IsAny<List<Job>>()))
//                .Returns(new List<JobResponseDto>
//                {
//                    new JobResponseDto
//                    {
//                        JobId = 1,
//                        JobTitle = "DotNet Developer"
//                    }
//                });

//            var result = await _jobService.GetRecommendedJobsAsync(1);


//            Assert.IsNotNull(result);

//            Assert.That(result.Count, Is.EqualTo(1));

//            Assert.That(
//                result[0].JobTitle,
//                Is.EqualTo("DotNet Developer"));
//        }
//    }
//}

