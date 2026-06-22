namespace CareerCrafterAPI.DTOs
{
    public class JobUpdateDto
    {
        public string JobTitle { get; set; } = string.Empty;

        public string JobDescription { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public decimal Salary { get; set; }
        public string? RequiredSkills { get; set; }
    }
}
