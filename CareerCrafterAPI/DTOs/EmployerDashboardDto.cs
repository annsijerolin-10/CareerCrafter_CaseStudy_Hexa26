namespace CareerCrafterAPI.DTOs
{
    public class EmployerDashboardDto
    {
        public int TotalJobsPosted { get; set; }

        public int TotalApplications { get; set; }

        public int AppliedCount { get; set; }

        public int ShortlistedCount { get; set; }

        public int RejectedCount { get; set; }

        public int WithdrawnCount { get; set; }
    }
}
