namespace CareerCrafterAPI.Repositories.Interfaces
{
    public interface IEmployerNotificationRepository
    {
        Task AddNotificationAsync(EmployerNotification notification);

        Task<List<EmployerNotification>>
        GetNotificationsByEmployerAsync(int employerId);

        Task MarkAsReadAsync(int id);

        Task<int> GetUnreadCountAsync(int employerId);
        Task MarkAllAsReadAsync(int employerId);
    }
}
