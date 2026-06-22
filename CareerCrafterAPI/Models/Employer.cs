namespace CareerCrafterAPI.Models
{
    public class Employer
    {
        public int EmployerId { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string CompanyDescription { get; set; } = string.Empty;

        public int UserId { get; set; }

        public User? User { get; set; }

        public List<Job> Jobs { get; set; } = new List<Job>();
    }
}