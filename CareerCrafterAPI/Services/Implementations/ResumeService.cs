using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;
using CareerCrafterAPI.Repositories.Implementations;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Interfaces;
using Microsoft.Identity.Client;

namespace CareerCrafterAPI.Services.Implementations
{
    public class ResumeService : IResumeService
    {
        private readonly IResumeRepository _resumeRepository;
        private readonly ILogger<ResumeService> _logger;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ResumeService(
            IResumeRepository resumeRepository,
            ILogger<ResumeService> logger,
             IMapper mapper,
              IWebHostEnvironment webHostEnvironment)
        {
            _resumeRepository = resumeRepository;
            _logger = logger;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<ResumeResponseDto>> GetAllResumesAsync()
        {
            _logger.LogInformation("Fetching all resumes");
            var resumes = await _resumeRepository.GetAllResumesAsync();

            return _mapper.Map<List<ResumeResponseDto>>(resumes);
        }

        public async Task<ResumeResponseDto?> GetResumeByIdAsync(int resumeId)
        {
            _logger.LogInformation("Fetching resume with Id {ResumeId}", resumeId);


            var resume = await _resumeRepository.GetResumeByIdAsync(resumeId);

            if (resume == null)
                return null;

            return _mapper.Map<ResumeResponseDto>(resume);
        }

       
        public async Task<ResumeResponseDto?> UpdateResumeAsync(int resumeId, ResumeUpdateDto dto)


        {
            try
            {

                _logger.LogInformation("Updating resume {ResumeId}", resumeId);



                var resume = await _resumeRepository.GetResumeByIdAsync(resumeId);


                if (resume == null)
                {
                    return null;
                }



                string? oldResumePath = resume.ResumeFile;

                _mapper.Map(dto, resume);

                if (dto.ResumeFile != null)
                {
                    // delete old file
                    if (!string.IsNullOrEmpty(oldResumePath))
                    {
                        DeleteResumeFile(oldResumePath);
                    }

                    // save new file
                    string newPath = await SaveResumeAsync(dto.ResumeFile);

                    resume.ResumeFile = newPath;
                }

                await _resumeRepository.UpdateResumeAsync(resume);
                _logger.LogInformation("Resume updated successfully. ResumeId: {ResumeId}", resumeId);



                return _mapper.Map<ResumeResponseDto>(resume);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating resume {ResumeId}", resumeId);
                throw;
            }
        }
        public async Task<bool> DeleteResumeAsync(int resumeId)
        {
            try {

                _logger.LogInformation("Deleting resume {ResumeId}", resumeId);

                var resume = await _resumeRepository.GetResumeByIdAsync(resumeId);

                if (resume == null)
                {
                    return false;
                }

                if (!string.IsNullOrEmpty(resume.ResumeFile))
                {
                    DeleteResumeFile(resume.ResumeFile);
                }

                await _resumeRepository.DeleteResumeAsync(resume);
                _logger.LogInformation("Resume deleted successfully. ResumeId: {ResumeId}", resumeId);
                return true;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error deleting resume {ResumeId}", resumeId);
                throw;
            }
        }
        private async Task<string> SaveResumeAsync(IFormFile resumeFile)
        {
            string uploadsFolder = Path.Combine(
                _webHostEnvironment.WebRootPath,
                "uploads",
                "resumes");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName =
                Guid.NewGuid().ToString()
                + "_"
                + Path.GetFileName(resumeFile.FileName);

            string filePath =
                Path.Combine(
                    uploadsFolder,
                    uniqueFileName);

            using (FileStream stream = new FileStream(filePath, FileMode.Create))

            {
                await resumeFile.CopyToAsync(stream);
            }

            return "/uploads/resumes/" + uniqueFileName;
        }
        private void DeleteResumeFile(string resumePath)
        {


            string existingFilePath =
                Path.Combine(
                    _webHostEnvironment.WebRootPath,
                    resumePath.TrimStart('/'));

            _logger.LogInformation("Deleting physical file: {FilePath}", existingFilePath);



            if (File.Exists(existingFilePath))
            {
                File.Delete(existingFilePath);
            }
        }



        public async Task<ResumeResponseDto> UploadResumeAsync(ResumeUploadDto dto)
        {
            try
            {

                bool exists = await _resumeRepository.JobSeekerExistsAsync(dto.JobSeekerId);


                if (!exists)
                {
                    throw new Exception("Job Seeker not found");
                }

                string resumePath = await SaveResumeAsync(dto.ResumeFile);


                var resume = new Resume
                {
                    ResumeFile = resumePath,
                    JobSeekerId = dto.JobSeekerId,
                    UploadDate = DateTime.Now
                };

                await _resumeRepository.UploadResumeAsync(resume);

                return _mapper.Map<ResumeResponseDto>(resume);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error uploading resume for JobSeeker {JobSeekerId}",
                    dto.JobSeekerId);

                throw;
            }
        }

    }

}
