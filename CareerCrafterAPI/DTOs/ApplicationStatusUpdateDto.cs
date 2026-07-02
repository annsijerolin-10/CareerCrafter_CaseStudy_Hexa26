using System.ComponentModel.DataAnnotations;

namespace CareerCrafterAPI.DTOs
{
    public class ApplicationStatusUpdateDto
    {
        [Required]
        [RegularExpression(
        "Applied|Reviewed|Shortlisted|Rejected",
        ErrorMessage = "Status must be Applied, Reviewed,Shortlisted or Rejected")]

        public string Status { get; set; } = string.Empty;
    }
}
