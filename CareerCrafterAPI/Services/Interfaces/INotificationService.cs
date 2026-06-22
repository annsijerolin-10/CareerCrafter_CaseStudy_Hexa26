using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CareerCrafterAPI.DTOs;



namespace CareerCrafterAPI.Services.Interfaces
{
    public interface INotificationService
    {
        Task<List<NotificationResponseDto>> GetByJobSeekerIdAsync(int jobSeekerId);

     

        Task<bool> MarkAsReadAsync(int notificationId);
    }
}
