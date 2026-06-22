using System.ComponentModel.DataAnnotations;

namespace CareerCrafterAPI.DTOs
{
    public class ApplicationStatusUpdateDto
    {
        [Required]
        [RegularExpression(
        "Applied|Shortlisted|Rejected",
        ErrorMessage = "Status must be Applied, Shortlisted or Rejected")]

        public string Status { get; set; } = string.Empty;
    }
}
