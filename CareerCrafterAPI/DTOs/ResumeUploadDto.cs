using System.ComponentModel.DataAnnotations;

namespace CareerCrafterAPI.DTOs
{
    public class ResumeUploadDto
    {
        [Required(ErrorMessage = "Resume file is required")]
        public IFormFile ResumeFile { get; set; } = null!;

        [Required( ErrorMessage = "Valid JobSeekerId is required")]
        public int JobSeekerId { get; set; }
    }
}
