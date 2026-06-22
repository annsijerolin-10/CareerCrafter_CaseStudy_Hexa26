namespace CareerCrafterAPI.DTOs
{
    public class EmployerCreateDto
    {
        public string CompanyName { get; set; } = string.Empty;

        public string CompanyDescription { get; set; } = string.Empty;

        public int UserId { get; set; }

    }
}
