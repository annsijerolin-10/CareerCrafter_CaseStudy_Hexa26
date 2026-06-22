namespace CareerCrafterAPI.DTOs
{
    public class JobSeekerResponseDto
    {
        public int JobSeekerId { get; set; }

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Skills { get; set; } = string.Empty;

        public int ExperienceYears { get; set; }

        public int UserId { get; set; }
    }
}
