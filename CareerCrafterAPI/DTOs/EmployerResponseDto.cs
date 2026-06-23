namespace CareerCrafterAPI.DTOs
{
    public class EmployerResponseDto
    {
        public int EmployerId { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string CompanyDescription { get; set; } = string.Empty;

        public int UserId { get; set; }
        
    }
}
