using CareerCrafterAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerCrafterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Employer")]
    public class EmployerNotificationsController : ControllerBase
    {
        private readonly IEmployerNotificationService _service;

        public EmployerNotificationsController(
            IEmployerNotificationService service)
        {
            _service = service;
        }

        [HttpGet("{employerId}")]
        public async Task<IActionResult> GetByEmployer(
            int employerId)
        {
            var notifications =
                await _service.GetByEmployerAsync(employerId);

            return Ok(notifications);
        }

        [HttpPut("read/{notificationId}")]
        public async Task<IActionResult> MarkAsRead(
            int notificationId)
        {
            var success =
                await _service.MarkAsReadAsync(notificationId);

            if (!success)
                return NotFound();

            return Ok(new
            {
                Message = "Notification marked as read."
            });
        }

        [HttpGet("unreadcount/{employerId}")]
        public async Task<IActionResult> GetUnreadCount(
            int employerId)
        {
            var count =
                await _service.GetUnreadCountAsync(employerId);

            return Ok(count);
        }

        [HttpPut("read-all/{employerId}")]
        public async Task<IActionResult> MarkAllAsRead(int employerId)
        {
            await _service.MarkAllAsReadAsync(employerId);

            return Ok();
        }
    }
}