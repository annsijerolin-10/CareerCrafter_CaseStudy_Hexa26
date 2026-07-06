namespace CareerCrafterAPI.DTOs
{
    public class JobSeekerDashboardDto
    {
        public int TotalApplications { get; set; }

        public int AppliedCount { get; set; }

        public int ShortlistedCount { get; set; }

        public int RejectedCount { get; set; }

        public int WithdrawnCount { get; set; }

        public int TotalResumes { get; set; }

        public int TotalNotifications { get; set; }
    }
}