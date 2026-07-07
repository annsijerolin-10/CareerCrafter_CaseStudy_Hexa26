using CareerCrafterAPI.Models;

public class EmployerNotification
{
    public int EmployerNotificationId { get; set; }

    public int EmployerId { get; set; }

    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; } = false;

    public DateTime CreatedDate { get; set; } = DateTime.Now;

    public int? ApplicationId { get; set; }

    public Employer Employer { get; set; }
}