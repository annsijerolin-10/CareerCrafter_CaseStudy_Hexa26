using static System.Net.Mime.MediaTypeNames;

namespace CareerCrafterAPI.Models
{
    public class Job
    {
        public int JobId { get; set; }

        public string JobTitle { get; set; } = string.Empty;

        public string JobDescription { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public decimal Salary { get; set; }

        public DateTime PostedDate { get; set; }

        public int EmployerId { get; set; }

        public Employer? Employer { get; set; }
        public string RequiredSkills { get; set; } = string.Empty;

        public List<Application> Applications { get; set; } = new List<Application>();
    }
}