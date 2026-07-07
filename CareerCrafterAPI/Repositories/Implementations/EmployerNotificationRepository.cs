using CareerCrafterAPI.Data;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
    public class EmployerNotificationRepository : IEmployerNotificationRepository
    {
        private readonly CareerCrafterDbContext _context;

        public EmployerNotificationRepository(CareerCrafterDbContext context)
        {
            _context = context;
        }
        public async Task AddNotificationAsync(EmployerNotification notification)

        {
            _context.EmployerNotifications.Add(notification);

            await _context.SaveChangesAsync();
        }


        public async Task<List<EmployerNotification>> GetNotificationsByEmployerAsync(int employerId)

        {
            return await _context.EmployerNotifications
                .Where(n => n.EmployerId == employerId)
                .OrderByDescending(n => n.CreatedDate)
                .ToListAsync();
        }
        public async Task MarkAsReadAsync(int id)
        {
            var notification =
                await _context.EmployerNotifications
                    .FindAsync(id);

            if (notification == null)
                return;

            notification.IsRead = true;

            await _context.SaveChangesAsync();
        }

     
        public async Task<int> GetUnreadCountAsync(int employerId)
        {
            return await _context.EmployerNotifications
                .CountAsync(n =>
                    n.EmployerId == employerId &&
                    !n.IsRead);
        }

        public async Task MarkAllAsReadAsync(int employerId)
        {
            var notifications = await _context.EmployerNotifications
                .Where(n =>
                    n.EmployerId == employerId &&
                    !n.IsRead)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
            }

            await _context.SaveChangesAsync();
        }
    }
}
