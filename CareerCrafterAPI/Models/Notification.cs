namespace CareerCrafterAPI.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }

        public string Message { get; set; } = string.Empty;

        public bool IsRead { get; set; } = false;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int JobSeekerId { get; set; }

        public JobSeeker JobSeeker { get; set; } = null!;
    }
}