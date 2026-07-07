using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;

namespace CareerCrafterAPI.Services.Implementations
{
    public class EmployerNotificationService : IEmployerNotificationService
    {
        private readonly IEmployerNotificationRepository _repository;
        private readonly IMapper _mapper;

        public EmployerNotificationService(
            IEmployerNotificationRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<EmployerNotificationDto>> GetByEmployerAsync(int employerId)
        {
            var notifications =
                await _repository.GetNotificationsByEmployerAsync(employerId);

            return _mapper.Map<List<EmployerNotificationDto>>(notifications);
        }

        public async Task<bool> MarkAsReadAsync(int notificationId)
        {
            await _repository.MarkAsReadAsync(notificationId);
            return true;
        }

        public async Task<int> GetUnreadCountAsync(int employerId)
        {
            var notifications =
                await _repository.GetNotificationsByEmployerAsync(employerId);

            return notifications.Count(n => !n.IsRead);
        }

        public async Task<bool> MarkAllAsReadAsync(int employerId)
        {
            await _repository.MarkAllAsReadAsync(employerId);
            return true;
        }
    }
}