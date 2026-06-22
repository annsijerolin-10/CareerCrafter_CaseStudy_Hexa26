using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;

namespace CareerCrafterAPI.Services.Implementations
{

    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(
                INotificationRepository notificationRepository,
                IMapper mapper,
                ILogger<NotificationService> logger)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<NotificationResponseDto>> GetByJobSeekerIdAsync(int jobSeekerId)

        {
            try
            {
                var notifications =
                    await _notificationRepository
                        .GetByJobSeekerIdAsync(jobSeekerId);

                return _mapper.Map<List<NotificationResponseDto>>
                    (notifications);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error fetching notifications for JobSeeker {JobSeekerId}",
                    jobSeekerId);

                throw;
            }
        }

        public async Task<bool> MarkAsReadAsync(int notificationId)
        {
            try
            {
                _logger.LogInformation("Marking notification {NotificationId} as read",
                    notificationId);


                var notification = await _notificationRepository.GetByIdAsync(notificationId);



                if (notification == null)
                {
                    return false;
                }

                notification.IsRead = true;

                await _notificationRepository
                    .UpdateAsync(notification);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error marking notification {NotificationId} as read",
                    notificationId);

                throw;
            }
        }
    
    }
}

