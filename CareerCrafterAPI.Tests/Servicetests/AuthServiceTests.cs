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
    public class AuthServiceTests
    {
        private Mock<IAuthRepository> _mockAuthRepository;
        private Mock<IJwtService> _mockJwtService;
        private AuthService _authService;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<AuthService>>();
            _mockAuthRepository =
                new Mock<IAuthRepository>();

            _mockJwtService =
                new Mock<IJwtService>();


            _authService =
                new AuthService(
                    _mockAuthRepository.Object,
                    _mockJwtService.Object,
                    logger.Object);
        }

        [Test]
        public async Task LoginAsync_ReturnsToken_WhenCredentialsAreValid()
        {
            var dto = new LoginRequestDto
            {
                Email = "john@gmail.com",
                Password = "john123"
            };

            var user = new User
            {
                UserId = 1,
                FullName = "John",
                Email = "john@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("john123"),
                Role = "Employer"
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByEmailAsync(dto.Email))
                .ReturnsAsync(user);

            _mockJwtService
                .Setup(j => j.GenerateToken(user))
                .Returns("dummy-jwt-token");

            var result = await _authService.LoginAsync(dto);

            Assert.IsNotNull(result);

            Assert.That(result.Token, Is.EqualTo("dummy-jwt-token"));

            _mockJwtService.Verify(
                j => j.GenerateToken(It.IsAny<User>()),
                Times.Once);
        }
        [Test]
        public async Task LoginAsync_ReturnsNull_WhenUserNotFound()
        {
            var dto = new LoginRequestDto
            {
                Email = "unknown@gmail.com",
                Password = "test123"
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByEmailAsync(dto.Email))
                .ReturnsAsync((User?)null);

            var result =
                await _authService.LoginAsync(dto);

            Assert.IsNull(result);
            _mockJwtService.Verify(
                j => j.GenerateToken(It.IsAny<User>()),
                Times.Never);
        }
        [Test]
        public async Task LoginAsync_ReturnsNull_WhenPasswordIsInvalid()
        {
            var dto = new LoginRequestDto
            {
                Email = "john@gmail.com",
                Password = "wrongpassword"
            };

            var user = new User
            {
                UserId = 1,
                FullName = "John",
                Email = "john@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("john123"),
                Role = "Employer"
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByEmailAsync(dto.Email))
                .ReturnsAsync(user);

            var result =
                await _authService.LoginAsync(dto);

            Assert.IsNull(result);
            _mockJwtService.Verify(
                j => j.GenerateToken(It.IsAny<User>()),
                Times.Never);
        }

        [Test]
        public async Task ForgotPasswordAsync_UpdatesPassword_WhenEmailExists()
        {
            var dto = new ForgotPasswordDto
            {
                Email = "john@gmail.com",
                NewPassword = "newpassword123"
            };

            var user = new User
            {
                UserId = 1,
                Email = "john@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("oldpassword")
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByEmailAsync(dto.Email))
                .ReturnsAsync(user);

            _mockAuthRepository
                .Setup(r => r.UpdateUserAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            await _authService.ForgotPasswordAsync(dto);

            _mockAuthRepository.Verify(
                r => r.UpdateUserAsync(It.IsAny<User>()),
                Times.Once);

            Assert.IsTrue(
                BCrypt.Net.BCrypt.Verify(
                    "newpassword123",
                    user.PasswordHash));
        }

        [Test]
        public void ForgotPasswordAsync_ThrowsException_WhenEmailNotFound()
        {
            var dto = new ForgotPasswordDto
            {
                Email = "unknown@gmail.com",
                NewPassword = "test123"
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByEmailAsync(dto.Email))
                .ReturnsAsync((User?)null);

            Assert.ThrowsAsync<Exception>(async () =>
                await _authService.ForgotPasswordAsync(dto));

            _mockAuthRepository.Verify(
                r => r.UpdateUserAsync(It.IsAny<User>()),
                Times.Never);
        }

        [Test]
        public async Task ChangePasswordAsync_ChangesPassword_WhenCurrentPasswordIsCorrect()
        {
            var dto = new ChangePasswordDto
            {
                UserId = 1,
                CurrentPassword = "oldpassword",
                NewPassword = "newpassword"
            };

            var user = new User
            {
                UserId = 1,
                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword("oldpassword")
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByIdAsync(1))
                .ReturnsAsync(user);

            _mockAuthRepository
                .Setup(r => r.UpdateUserAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            await _authService.ChangePasswordAsync(dto);

            _mockAuthRepository.Verify(
                r => r.UpdateUserAsync(It.IsAny<User>()),
                Times.Once);

            Assert.IsTrue(
                BCrypt.Net.BCrypt.Verify(
                    "newpassword",
                    user.PasswordHash));
        }
        [Test]
        public void ChangePasswordAsync_ThrowsException_WhenUserNotFound()
        {
            var dto = new ChangePasswordDto
            {
                UserId = 100,
                CurrentPassword = "old",
                NewPassword = "new"
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByIdAsync(100))
                .ReturnsAsync((User?)null);

            Assert.ThrowsAsync<Exception>(async () =>
                await _authService.ChangePasswordAsync(dto));

            _mockAuthRepository.Verify(
                r => r.UpdateUserAsync(It.IsAny<User>()),
                Times.Never);
        }
        [Test]
        public void ChangePasswordAsync_ThrowsException_WhenCurrentPasswordIsIncorrect()
        {
            var dto = new ChangePasswordDto
            {
                UserId = 1,
                CurrentPassword = "wrongpassword",
                NewPassword = "newpassword"
            };

            var user = new User
            {
                UserId = 1,
                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword("correctpassword")
            };

            _mockAuthRepository
                .Setup(r => r.GetUserByIdAsync(1))
                .ReturnsAsync(user);

            Assert.ThrowsAsync<Exception>(async () =>
                await _authService.ChangePasswordAsync(dto));

            _mockAuthRepository.Verify(
                r => r.UpdateUserAsync(It.IsAny<User>()),
                Times.Never);
        }
    } 
}
