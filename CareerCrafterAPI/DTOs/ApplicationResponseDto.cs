namespace CareerCrafterAPI.DTOs
{
    public class ApplicationResponseDto
    {
        public int ApplicationId { get; set; }

        public DateTime ApplicationDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public int JobId { get; set; }

        public int JobSeekerId { get; set; }
        public string JobSeekerName { get; set; } = string.Empty;
    }
}
