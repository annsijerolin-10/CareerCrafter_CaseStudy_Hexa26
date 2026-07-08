using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(
            INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("jobseeker/{jobSeekerId}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> GetNotifications(int jobSeekerId)

        {
            var notifications =
                await _notificationService
                    .GetByJobSeekerIdAsync(jobSeekerId);

            return Ok(notifications);
        }

    
    [HttpPut("{id}/read")]
        [Authorize(Roles = "JobSeeker")]

        public async Task<IActionResult> MarkAsRead(int id)
        {
            var result =
                await _notificationService
                    .MarkAsReadAsync(id);

            if (!result)
                return NotFound();

            return Ok(new
            {
                Message = "Notification marked as read"
            });
        }

        [HttpPut("jobseeker/{jobSeekerId}/read-all")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> MarkAllAsRead(
    int jobSeekerId)
        {
            await _notificationService
                .MarkAllAsReadAsync(jobSeekerId);

            return Ok(new
            {
                Message = "All notifications marked as read."
            });
        }
    } 
}
