namespace CareerCrafterAPI.DTOs
{
    public class EmployerNotificationDto
    {
        public int EmployerNotificationId { get; set; }

        public string Message { get; set; } = string.Empty;

        public bool IsRead { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? ApplicationId { get; set; }
    }
}
