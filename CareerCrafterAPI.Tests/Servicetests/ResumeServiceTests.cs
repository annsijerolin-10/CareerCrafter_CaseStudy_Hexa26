using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Implementations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerCrafterAPI.Tests.Servicetests
{
    public class ResumeServiceTests
    {
        private Mock<IResumeRepository> _mockRepository;
        private ResumeService _resumeService;
        private Mock<IMapper> _mockMapper;
        private Mock<IWebHostEnvironment> _mockEnvironment;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<ResumeService>>();

            _mockRepository = new Mock<IResumeRepository>();
            _mockMapper = new Mock<IMapper>();

            _mockEnvironment = new Mock<IWebHostEnvironment>();

            _mockEnvironment
                .Setup(x => x.WebRootPath)
                .Returns("wwwroot");

            _resumeService = new ResumeService(
                    _mockRepository.Object,
                    logger.Object,
                    _mockMapper.Object,
                     _mockEnvironment.Object);


        }
        [Test]
        public async Task GetResumeById_ReturnsResume_WhenResumeExists()
        {
            var resume = new Resume
            {
                ResumeId = 1,
                ResumeFile = "uploads/resume.pdf",
                JobSeekerId = 1,
                UploadDate = DateTime.Now

            };
            _mockRepository.Setup(r => r.GetResumeByIdAsync(1)).ReturnsAsync(resume);

            _mockMapper
                .Setup(m => m.Map<ResumeResponseDto>(It.IsAny<Resume>()))
                .Returns(new ResumeResponseDto
                {
                    ResumeId = 1,
                    ResumeFile = "uploads/resume.pdf",
                    JobSeekerId = 1
                });


            var result = await _resumeService.GetResumeByIdAsync(1);
            Assert.IsNotNull(result);
            Assert.That(result.ResumeFile, Is.EqualTo("uploads/resume.pdf"));
        }
        [Test]
        public async Task GetResumeByIdAsync_ReturnsNull_WhenResumeNotFound()
        {
            _mockRepository.Setup(r => r.GetResumeByIdAsync(20)).ReturnsAsync((Resume?)null);
            var result = await _resumeService.GetResumeByIdAsync(20);
            Assert.IsNull(result);
        }



        [Test]
        public async Task DeleteResumeAsync_ReturnsTrue_WhenDeleted()
        {
            var resume = new Resume
            {
                ResumeId = 1,
                ResumeFile = "/uploads/resume.pdf"
            };

            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(1))
                .ReturnsAsync(resume);

            _mockRepository
                .Setup(r => r.DeleteResumeAsync(resume))
                .Returns(Task.CompletedTask);
            _mockRepository
                .Setup(r => r.CanDeleteResumeAsync(1))
                .ReturnsAsync(true);

            var result = await _resumeService.DeleteResumeAsync(1);


            Assert.IsTrue(result);
            _mockRepository.Verify(
                r => r.DeleteResumeAsync(It.IsAny<Resume>()),
                Times.Once);
        }
        [Test]
        public async Task DeleteResumeAsync_ReturnsFalse_WhenResumeNotFound()
        {
            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(100))
                .ReturnsAsync((Resume?)null);

            var result = await _resumeService.DeleteResumeAsync(100);


            Assert.IsFalse(result);
            _mockRepository.Verify(
                r => r.DeleteResumeAsync(It.IsAny<Resume>()),
                Times.Never);
        }
        [Test]
        public async Task UpdateResumeAsync_ReturnsNull_WhenResumeNotFound()
        {
            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(999))
                .ReturnsAsync((Resume?)null);

            var dto = new ResumeUpdateDto();

            var result =
                await _resumeService.UpdateResumeAsync(999, dto);

            Assert.IsNull(result);
        }

        [Test]
        public async Task UploadResumeAsync_ReturnsUploadedResume()
        {
            var bytes = Encoding.UTF8.GetBytes("Dummy PDF");

            var stream = new MemoryStream(bytes);

            IFormFile file = new FormFile(
                stream,
                0,
                bytes.Length,
                "ResumeFile",
                "resume.pdf");

            var dto = new ResumeUploadDto
            {
                ResumeFile = file,
                JobSeekerId = 1
            };

            _mockRepository
                .Setup(r => r.JobSeekerExistsAsync(1))
                .ReturnsAsync(true);

            _mockRepository
                .Setup(r => r.AddResumeAsync(It.IsAny<Resume>()))
                .Returns(Task.CompletedTask);

            _mockMapper
                .Setup(m => m.Map<ResumeResponseDto>(It.IsAny<Resume>()))
                .Returns(new ResumeResponseDto
                {
                    JobSeekerId = 1
                });

            var result =
                await _resumeService.UploadResumeAsync(dto);

            Assert.IsNotNull(result);

            _mockRepository.Verify(
                r => r.AddResumeAsync(It.IsAny<Resume>()),
                Times.Once);
        }

        [Test]
        public async Task UpdateResumeAsync_ReturnsUpdatedResume_WhenResumeExists()
        {
            var resume = new Resume
            {
                ResumeId = 1,
                ResumeFile = "/uploads/old.pdf",
                JobSeekerId = 1
            };

            var dto = new ResumeUpdateDto
            {
                ResumeFile = null
            };

            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(1))
                .ReturnsAsync(resume);

            _mockMapper
                .Setup(m => m.Map(It.IsAny<ResumeUpdateDto>(),
                                  It.IsAny<Resume>()))
                .Callback<ResumeUpdateDto, Resume>((d, r) =>
                {

                });

            _mockRepository
                .Setup(r => r.UpdateResumeAsync(It.IsAny<Resume>()))
                .Returns(Task.CompletedTask);

            _mockMapper
                .Setup(m => m.Map<ResumeResponseDto>(It.IsAny<Resume>()))
                .Returns(new ResumeResponseDto
                {
                    ResumeId = 1,
                    ResumeFile = "/uploads/old.pdf",
                    JobSeekerId = 1
                });

            var result = await _resumeService.UpdateResumeAsync(1, dto);


            Assert.IsNotNull(result);

            Assert.That(result.ResumeFile, Is.EqualTo("/uploads/old.pdf"));



            _mockRepository.Verify(r => r.UpdateResumeAsync(It.IsAny<Resume>()), Times.Once);


        }

        [Test]
        public void UploadResumeAsync_ThrowsException_WhenJobSeekerNotFound()
        {
            var fileMock = new Mock<IFormFile>();

            var dto = new ResumeUploadDto
            {
                ResumeFile = fileMock.Object,
                JobSeekerId = 100
            };

            _mockRepository
                .Setup(r => r.JobSeekerExistsAsync(100))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<Exception>(
                async () =>
                    await _resumeService.UploadResumeAsync(dto));
        }

        [Test]
        public void UpdateResumeAsync_ThrowsException_WhenUploadedFileIsNotPdf()
        {
            var resume = new Resume
            {
                ResumeId = 1,
                ResumeFile = "/uploads/old.pdf"
            };

            var fileMock = new Mock<IFormFile>();

            fileMock
                .Setup(f => f.FileName)
                .Returns("resume.docx");

            var dto = new ResumeUpdateDto
            {
                ResumeFile = fileMock.Object
            };

            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(1))
                .ReturnsAsync(resume);

            Assert.ThrowsAsync<Exception>(async () =>
                await _resumeService.UpdateResumeAsync(1, dto));
        }

        [Test]
        public void UploadResumeAsync_ThrowsException_WhenFileIsNotPdf()
        {
            var fileMock = new Mock<IFormFile>();

            fileMock.Setup(f => f.FileName).Returns("resume.docx");


            var dto = new ResumeUploadDto
            {
                ResumeFile = fileMock.Object,
                JobSeekerId = 1
            };

            _mockRepository
                .Setup(r => r.JobSeekerExistsAsync(1))
                .ReturnsAsync(true);

            Assert.ThrowsAsync<Exception>(
                async () =>
                    await _resumeService.UploadResumeAsync(dto));
        }

        [Test]
        public async Task GetAllResumesAsync_ReturnsResumes()
        {
            var resumes = new List<Resume>
            {
                new Resume
                {
                    ResumeId = 1,
                    ResumeFile = "/uploads/resume.pdf",
                    JobSeekerId = 1
                }
            };

            _mockRepository
                .Setup(r => r.GetAllResumesAsync())
                .ReturnsAsync(resumes);

            _mockMapper
                .Setup(m => m.Map<List<ResumeResponseDto>>(It.IsAny<List<Resume>>()))
                .Returns(new List<ResumeResponseDto>
                {
            new ResumeResponseDto
            {
                ResumeId = 1,
                ResumeFile = "/uploads/resume.pdf",
                JobSeekerId = 1
            }
                });

            var result =
                await _resumeService.GetAllResumesAsync();

            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));

        }

        [Test]
        public void DeleteResumeAsync_ThrowsException_WhenResumeIsInUse()
        {
            var resume = new Resume
            {
                ResumeId = 1
            };

            _mockRepository
                .Setup(r => r.GetResumeByIdAsync(1))
                .ReturnsAsync(resume);

            _mockRepository
                .Setup(r => r.CanDeleteResumeAsync(1))
                .ReturnsAsync(false);

            Assert.ThrowsAsync<ArgumentException>(async () =>
                await _resumeService.DeleteResumeAsync(1));

            _mockRepository.Verify(
                r => r.DeleteResumeAsync(It.IsAny<Resume>()),
                Times.Never);
        }


        [Test]
        public async Task GetResumeByJobSeekerIdAsync_ReturnsResumes()
        {
            var resumes = new List<Resume>
                {
                    new Resume
                    {
                        ResumeId = 1,
                        ResumeFile = "/uploads/resume.pdf",
                        JobSeekerId = 1
                    }
                };

            _mockRepository
                .Setup(r => r.GetResumeByJobSeekerIdAsync(1))
                .ReturnsAsync(resumes);

            _mockMapper
                .Setup(m => m.Map<List<ResumeResponseDto>>(It.IsAny<List<Resume>>()))
                .Returns(new List<ResumeResponseDto>
                {
            new ResumeResponseDto
            {
                ResumeId = 1,
                ResumeFile = "/uploads/resume.pdf",
                JobSeekerId = 1
            }
                });

            var result =
                await _resumeService.GetResumeByJobSeekerIdAsync(1);

            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));
        }





    }
}
