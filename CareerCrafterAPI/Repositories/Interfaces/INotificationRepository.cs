using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task AddAsync(Notification notification);

        Task<List<Notification>> GetByJobSeekerIdAsync(int jobSeekerId);

        Task<Notification?> GetByIdAsync(int notificationId);

        Task UpdateAsync(Notification notification);
        Task MarkAllAsReadAsync(int jobSeekerId);
    }
}
