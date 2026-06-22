using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.DTOs
{
    public class JobSeekerUpdateDto
    {
        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Skills { get; set; } = string.Empty;

        public int ExperienceYears { get; set; }
    }
}
