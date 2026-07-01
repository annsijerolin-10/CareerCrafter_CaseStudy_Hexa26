namespace CareerCrafterAPI.DTOs
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
        public int UserId { get; set; }

        public int? EmployerId { get; set; }

        public int? JobSeekerId { get; set; }

        public string FullName { get; set; } = string.Empty;
    }
}
