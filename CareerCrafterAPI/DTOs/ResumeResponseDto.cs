namespace CareerCrafterAPI.DTOs
{
    public class ResumeResponseDto
    {
        public int ResumeId { get; set; }

        public string ResumeFile { get; set; } = string.Empty;

        public DateTime UploadDate { get; set; }

        public int JobSeekerId { get; set; }
    }
}
