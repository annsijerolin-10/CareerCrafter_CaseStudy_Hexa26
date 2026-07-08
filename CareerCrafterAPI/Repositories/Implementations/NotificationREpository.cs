using CareerCrafterAPI.Data;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Repositories.Implementations
{
   
        public class NotificationRepository : INotificationRepository
        {
            private readonly CareerCrafterDbContext _context;

            public NotificationRepository(CareerCrafterDbContext context)
            {
                _context = context;
            }

            public async Task AddAsync(Notification notification)
            {
                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync();
            }

            public async Task<List<Notification>> GetByJobSeekerIdAsync(int jobSeekerId)
            {
                return await _context.Notifications
                    .Where(n => n.JobSeekerId == jobSeekerId)
                    .ToListAsync();
            }

            public async Task<Notification?> GetByIdAsync(int notificationId)
            {
                return await _context.Notifications
                    .FirstOrDefaultAsync(n => n.NotificationId == notificationId);
            }

            public async Task UpdateAsync(Notification notification)
            {
                _context.Notifications.Update(notification);
                await _context.SaveChangesAsync();
            }
        public async Task MarkAllAsReadAsync(int jobSeekerId)
        {
            var notifications = await _context.Notifications
                .Where(n =>
                    n.JobSeekerId == jobSeekerId &&
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

