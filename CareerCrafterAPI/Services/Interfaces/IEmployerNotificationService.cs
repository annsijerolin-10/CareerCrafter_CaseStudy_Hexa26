using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IEmployerNotificationService
    {
        Task<List<EmployerNotificationDto>> GetByEmployerAsync(int employerId);

        Task<bool> MarkAsReadAsync(int notificationId);

        Task<int> GetUnreadCountAsync(int employerId);
        Task<bool> MarkAllAsReadAsync(int employerId);
    }
}
