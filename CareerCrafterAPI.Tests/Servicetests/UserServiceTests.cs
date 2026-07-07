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
    public class UserServiceTests
    {
        private Mock<IUserRepository> _mockRepository;
        private UserService _userService;
        private Mock<IMapper> _mockMapper;
        private Mock<IEmployerRepository> _mockEmployerRepository;
        private Mock<IJobSeekerRepository> _mockJobSeekerRepository;

        [SetUp]
        public void Setup()
        {
            var logger = new Mock<ILogger<UserService>>();
            _mockMapper = new Mock<IMapper>();
            _mockRepository = new Mock<IUserRepository>();
            _mockEmployerRepository = new Mock<IEmployerRepository>();
            _mockJobSeekerRepository = new Mock<IJobSeekerRepository>();

            _userService = new UserService(
                _mockRepository.Object,
                 _mockEmployerRepository.Object,
                _mockJobSeekerRepository.Object,
                logger.Object, 
                _mockMapper.Object);


        }

        [Test]
        public async Task GetUserByIdAsync_ReturnsUser_WhenUserExists()
        {

            var user = new User
            {
                UserId = 1,
                FullName = "John",
                Email = "john@gmail.com",
                Role = "Employer"
            };

            _mockRepository
                .Setup(r => r.GetUserByIdAsync(1))
                .ReturnsAsync(user);



            _mockMapper.Setup(m => m.Map<UserResponseDto>(It.IsAny<User>())).Returns(new UserResponseDto
            {
                UserId = 1,
                FullName = "John",
                Email = "john@gmail.com",
                Role = "Employer"
            });

            var result = await _userService.GetUserByIdAsync(1);



            Assert.IsNotNull(result);

            Assert.That(result.UserId, Is.EqualTo(1));

            Assert.That(result.FullName,
                Is.EqualTo("John"));
        }

        [Test]
        public async Task GetUserByIdAsync_ReturnsNull_WhenUserDoesNotExist()
        {

            _mockRepository
                .Setup(r => r.GetUserByIdAsync(100))
                .ReturnsAsync((User?)null);


            var result =
                await _userService.GetUserByIdAsync(100);
            Assert.IsNull(result);
        }

        [Test]
        public async Task AddUserAsync_ReturnsCreatedUser()
        {

            var dto = new UserCreateDto
            {
                FullName = "Priya",
                Email = "priya@gmail.com",
                Password = "priya123",
                Role = "JobSeeker"
            };
            _mockRepository
                .Setup(r => r.EmailExistsAsync(dto.Email))
                .ReturnsAsync(false);

            _mockRepository
                .Setup(r => r.AddUserAsync(It.IsAny<User>()))
                .ReturnsAsync((User user) => user);
            _mockJobSeekerRepository
                .Setup(r => r.AddJobSeekerAsync(It.IsAny<JobSeeker>()))
                .Returns(Task.CompletedTask);

            _mockMapper.Setup(m => m.Map<User>(It.IsAny<UserCreateDto>())).Returns(new User

            {
                FullName = "Priya",
                Email = "priya@gmail.com",
                Role = "JobSeeker"
            });


            _mockMapper.Setup(m => m.Map<UserResponseDto>(It.IsAny<User>())).Returns(new UserResponseDto
            {
                UserId = 1,
                FullName = "Priya",
                Email = "priya@gmail.com",
                Role = "JobSeeker"
            });

            var result = await _userService.AddUserAsync(dto);



            Assert.IsNotNull(result);

            Assert.That(result.FullName,
                Is.EqualTo("Priya"));

            Assert.That(result.Email,
                Is.EqualTo("priya@gmail.com"));

            _mockRepository.Verify(r => r.AddUserAsync(It.IsAny<User>()), Times.Once);

            _mockJobSeekerRepository.Verify(
                r => r.AddJobSeekerAsync(It.IsAny<JobSeeker>()),
                Times.Once);

        }
        [Test]
        public async Task GetAllUsersAsync_ReturnsUsers()
        {
            var users = new List<User>  {

                new User
                {
                    UserId = 1,
                    FullName = "John",
                    Email = "john@gmail.com",
                    Role = "Employer"
                }
            };

            _mockRepository
                .Setup(r => r.GetAllUsersAsync())
                .ReturnsAsync(users);

            _mockMapper
                .Setup(m => m.Map<List<UserResponseDto>>(It.IsAny<List<User>>()))
                .Returns(new List<UserResponseDto>
                {
            new UserResponseDto
            {
                UserId = 1,
                FullName = "John",
                Email = "john@gmail.com",
                Role = "Employer"
            }
                });

            var result = await _userService.GetAllUsersAsync();

            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
        }
        [Test]
        public void AddUserAsync_ThrowsException_WhenEmailAlreadyExists()
        {
            var dto = new UserCreateDto
            {
                FullName = "John",
                Email = "john@gmail.com",
                Password = "password",
                Role = "JobSeeker"
            };

            _mockRepository
                .Setup(r => r.EmailExistsAsync(dto.Email))
                .ReturnsAsync(true);

            Assert.ThrowsAsync<Exception>(async () =>
                await _userService.AddUserAsync(dto));

            _mockRepository.Verify(
                r => r.AddUserAsync(It.IsAny<User>()),
                Times.Never);
        }
        [Test]
        public async Task AddUserAsync_CreatesEmployer_WhenRoleIsEmployer()
        {
            var dto = new UserCreateDto
            {
                FullName = "ABC",
                Email = "abc@gmail.com",
                Password = "password",
                Role = "Employer",
                CompanyName = "Hexaware",
                CompanyDescription = "IT Services"
            };

            var user = new User
            {
                UserId = 1,
                FullName = "ABC",
                Email = "abc@gmail.com",
                Role = "Employer"
            };

            _mockRepository
                .Setup(r => r.EmailExistsAsync(dto.Email))
                .ReturnsAsync(false);

            _mockMapper
                .Setup(m => m.Map<User>(dto))
                .Returns(user);

            _mockRepository
                .Setup(r => r.AddUserAsync(It.IsAny<User>()))
                .ReturnsAsync((User user) => user);

            _mockEmployerRepository
                .Setup(r => r.AddEmployerAsync(It.IsAny<Employer>()))
                .Returns(Task.CompletedTask);

            _mockMapper
                .Setup(m => m.Map<UserResponseDto>(user))
                .Returns(new UserResponseDto
                {
                    UserId = 1,
                    FullName = "ABC",
                    Email = "abc@gmail.com",
                    Role = "Employer"
                });

            var result =
                await _userService.AddUserAsync(dto);

            Assert.IsNotNull(result);

            _mockEmployerRepository.Verify(
                r => r.AddEmployerAsync(It.IsAny<Employer>()),
                Times.Once);

            _mockRepository.Verify(
                r => r.AddUserAsync(It.IsAny<User>()),
                Times.Once);
        }
    }
}