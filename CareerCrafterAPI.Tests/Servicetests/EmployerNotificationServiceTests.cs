using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Implementations;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace CareerCrafterAPI.Tests.Servicetests
{
    public class EmployerNotificationServiceTests
    {
        private Mock<IEmployerNotificationRepository> _mockRepository;
        private Mock<IMapper> _mockMapper;
        private EmployerNotificationService _service;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IEmployerNotificationRepository>();
            _mockMapper = new Mock<IMapper>();

            _service = new EmployerNotificationService(
                _mockRepository.Object,
                _mockMapper.Object);
        }

        [Test]
        public async Task GetByEmployerAsync_ReturnsNotifications()
        {
            var notifications = new List<EmployerNotification>
            {
                new EmployerNotification
                {
                    EmployerNotificationId = 1,
                    EmployerId = 1,
                    Message = "New application received.",
                    IsRead = false,
                    CreatedDate = DateTime.Now
                }
            };

            var dtoList = new List<EmployerNotificationDto>
            {
                new EmployerNotificationDto
                {
                    EmployerNotificationId = 1,
                    Message = "New application received.",
                    IsRead = false,
                    CreatedDate = notifications[0].CreatedDate
                }
            };

            _mockRepository
                .Setup(r => r.GetNotificationsByEmployerAsync(1))
                .ReturnsAsync(notifications);

            _mockMapper
                .Setup(m => m.Map<List<EmployerNotificationDto>>(notifications))
                .Returns(dtoList);
            var result = await _service.GetByEmployerAsync(1);
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Message, Is.EqualTo("New application received."));
        }

        [Test]
        public async Task GetUnreadCountAsync_ReturnsUnreadCount()
        {
            var notifications = new List<EmployerNotification>
            {
                new EmployerNotification
                {
                    EmployerNotificationId = 1,
                    EmployerId = 1,
                    IsRead = false
                },
                new EmployerNotification
                {
                    EmployerNotificationId = 2,
                    EmployerId = 1,
                    IsRead = true
                },
                new EmployerNotification
                {
                    EmployerNotificationId = 3,
                    EmployerId = 1,
                    IsRead = false
                }
            };

            _mockRepository
                .Setup(r => r.GetNotificationsByEmployerAsync(1))
                .ReturnsAsync(notifications);
            var result = await _service.GetUnreadCountAsync(1);

            Assert.That(result, Is.EqualTo(2));
        }

        [Test]
        public async Task MarkAsReadAsync_ReturnsTrue()
        {
            _mockRepository
                .Setup(r => r.MarkAsReadAsync(1))
                .Returns(Task.CompletedTask);
            var result = await _service.MarkAsReadAsync(1);

            // Assert
            Assert.IsTrue(result);

            _mockRepository.Verify(
                r => r.MarkAsReadAsync(1),
                Times.Once);
        }

        [Test]
        public async Task GetByEmployerAsync_ReturnsEmptyList_WhenNoNotifications()
        {
            var notifications = new List<EmployerNotification>();

            var dtoList = new List<EmployerNotificationDto>();

            _mockRepository
                .Setup(r => r.GetNotificationsByEmployerAsync(5))
                .ReturnsAsync(notifications);

            _mockMapper
                .Setup(m => m.Map<List<EmployerNotificationDto>>(notifications))
                .Returns(dtoList);
            var result = await _service.GetByEmployerAsync(5);
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task GetUnreadCountAsync_ReturnsZero_WhenAllNotificationsAreRead()
        {
            var notifications = new List<EmployerNotification>
            {
                new EmployerNotification
                {
                    EmployerNotificationId = 1,
                    EmployerId = 1,
                    IsRead = true
                },
                new EmployerNotification
                {
                    EmployerNotificationId = 2,
                    EmployerId = 1,
                    IsRead = true
                }
            };

            _mockRepository
                .Setup(r => r.GetNotificationsByEmployerAsync(1))
                .ReturnsAsync(notifications);
            var result = await _service.GetUnreadCountAsync(1);
            Assert.That(result, Is.EqualTo(0));
        }
    }
}