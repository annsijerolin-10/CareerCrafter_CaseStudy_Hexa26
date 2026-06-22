using CareerCrafterAPI.DTOs;

namespace CareerCrafterAPI.Services.Interfaces
{
    public interface IResumeService
    {
        Task<List<ResumeResponseDto>> GetAllResumesAsync();

        Task<ResumeResponseDto?> GetResumeByIdAsync(int resumeId);

       // Task<ResumeResponseDto> AddResumeAsync(ResumeUploadDto dto);
        Task<ResumeResponseDto?> UpdateResumeAsync(int jobId, ResumeUpdateDto dto);

        Task<ResumeResponseDto> UploadResumeAsync(ResumeUploadDto dto);

        Task<bool> DeleteResumeAsync(int ResumeId);

    }
}
