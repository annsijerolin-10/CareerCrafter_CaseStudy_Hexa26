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
    public class NotificationServiceTests
    {
        private Mock<INotificationRepository> _mockRepository;
        private Mock<IMapper> _mockMapper;
        private NotificationService _notificationService;
        private Mock<ILogger<NotificationService>> _mockLogger;
        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<INotificationRepository>();
           

            _mockMapper = new Mock<IMapper>();

            _mockLogger = new Mock<ILogger<NotificationService>>();


            _notificationService = new NotificationService(
                    _mockRepository.Object,
                    _mockMapper.Object,
                     _mockLogger.Object);


        }
        [Test]
        public async Task GetByJobSeekerIdAsync_ReturnsNotifications()
        {
            var notifications = new List<Notification>
            {
                new Notification
                {
                    NotificationId = 1,
                    Message = "Application Shortlisted",
                    JobSeekerId = 2
                }
            };

            _mockRepository
                .Setup(r => r.GetByJobSeekerIdAsync(2))
                .ReturnsAsync(notifications);

            _mockMapper
                .Setup(m => m.Map<List<NotificationResponseDto>>
                (It.IsAny<List<Notification>>()))
                .Returns(new List<NotificationResponseDto>
                {
            new NotificationResponseDto
            {
                NotificationId = 1,
                Message = "Application Shortlisted"
            }
                });

            var result =
                await _notificationService
                    .GetByJobSeekerIdAsync(2);

            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task GetByJobSeekerIdAsync_ReturnsEmptyList_WhenNoNotificationsExist()
        {
            _mockRepository
                .Setup(r => r.GetByJobSeekerIdAsync(1))
                .ReturnsAsync(new List<Notification>());

            _mockMapper
                .Setup(m => m.Map<List<NotificationResponseDto>>(
                    It.IsAny<List<Notification>>()))
                .Returns(new List<NotificationResponseDto>());

            var result =
                await _notificationService.GetByJobSeekerIdAsync(1);

            Assert.IsNotNull(result);

            Assert.That(result.Count, Is.EqualTo(0));
        }
        [Test]
        public async Task MarkAsReadAsync_ReturnsTrue_WhenNotificationExists()
        {
            var notification = new Notification
            {
                NotificationId = 1,
                Message = "Application Shortlisted",
                IsRead = false
            };

            _mockRepository
                .Setup(r => r.GetByIdAsync(1))
                .ReturnsAsync(notification);

            _mockRepository
                .Setup(r => r.UpdateAsync(It.IsAny<Notification>()))
                .Returns(Task.CompletedTask);

            var result =
                await _notificationService
                    .MarkAsReadAsync(1);

            Assert.IsTrue(result);

            Assert.That(notification.IsRead,
                Is.True);

            _mockRepository.Verify(
                r => r.UpdateAsync(It.IsAny<Notification>()),
                Times.Once);
        }
        [Test]
        public void GetByJobSeekerIdAsync_ThrowsException_WhenRepositoryThrowsException()
        {
            _mockRepository
                .Setup(r => r.GetByJobSeekerIdAsync(1))
                .ThrowsAsync(new Exception("Database error"));

            Assert.ThrowsAsync<Exception>(async () =>
                await _notificationService.GetByJobSeekerIdAsync(1));
        }
        [Test]
        public async Task MarkAsReadAsync_ReturnsFalse_WhenNotificationNotFound()
        {
            _mockRepository
                .Setup(r => r.GetByIdAsync(100))
                .ReturnsAsync((Notification?)null);

            var result =
                await _notificationService
                    .MarkAsReadAsync(100);

            Assert.IsFalse(result);

            _mockRepository.Verify(
                r => r.UpdateAsync(It.IsAny<Notification>()),
                Times.Never);
        }

    }
}
