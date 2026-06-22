

namespace CareerCrafterAPI.Models
{
    public class JobSeeker
    {
        public int JobSeekerId { get; set; }

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Skills { get; set; } = string.Empty;

        public int ExperienceYears { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; } = null!;

        public List<Application> Applications { get; set; } = new List<Application>();

        public List<Resume> Resumes { get; set; } = new List<Resume>();
    }
}