namespace CareerCrafterAPI.Models
{
    public class Application
    {
        public int ApplicationId { get; set; }
        public DateTime ApplicationDate { get; set; }
        public string Status { get; set; } = string.Empty;

        public int JobId { get; set; }
        public Job? Job { get; set; }

        public int JobSeekerId { get; set; }
        public JobSeeker? JobSeeker { get; set; }
    }
}
