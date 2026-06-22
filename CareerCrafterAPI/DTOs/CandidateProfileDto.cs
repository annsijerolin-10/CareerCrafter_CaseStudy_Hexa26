namespace CareerCrafterAPI.DTOs
{
    public class CandidateProfileDto
    {
        public int JobSeekerId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; }=string.Empty;

        public string Address { get; set; }= string.Empty;

        public string Skills { get; set; }= string.Empty;

        public int ExperienceYears { get; set; }

        public string? ResumeFile { get; set; }
    }
}
