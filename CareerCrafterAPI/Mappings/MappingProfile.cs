using AutoMapper;
using CareerCrafterAPI.DTOs;
using CareerCrafterAPI.Models;

namespace CareerCrafterAPI.Mappings
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
           
            CreateMap<User, UserResponseDto>();
            CreateMap<UserCreateDto, User>();

          
            CreateMap<Employer, EmployerResponseDto>();
            CreateMap<EmployerCreateDto, Employer>();

            CreateMap<Job, JobResponseDto>()
                .ForMember(
                    dest => dest.CompanyName,
                    opt => opt.MapFrom(
                        src => src.Employer != null
                            ? src.Employer.CompanyName
                            : ""
                    ));
            CreateMap<JobCreateDto, Job>();
            CreateMap<JobUpdateDto, Job>();

            CreateMap<JobSeeker, JobSeekerResponseDto>();
            CreateMap<JobSeekerCreateDto, JobSeeker>();
            CreateMap<JobSeekerUpdateDto, JobSeeker>();

            CreateMap<Resume, ResumeResponseDto>();
           // CreateMap<ResumeUploadDto, Resume>();
            CreateMap<ResumeUpdateDto, Resume>()
                 .ForMember(
                     dest => dest.ResumeFile,
                     opt => opt.Ignore());

            CreateMap<ApplicationCreateDto, Application>();
            CreateMap<Application, ApplicationResponseDto>()
            .ForMember(
                dest => dest.JobSeekerName,
                opt => opt.MapFrom(
                    src => src.JobSeeker != null &&
                           src.JobSeeker.User != null
                        ? src.JobSeeker.User.FullName
                        : ""))

            .ForMember(
                dest => dest.JobTitle,
                opt => opt.MapFrom(
                    src => src.Job != null
                        ? src.Job.JobTitle
                        : ""))

            .ForMember(
                dest => dest.CompanyName,
                opt => opt.MapFrom(
                    src => src.Job != null &&
                           src.Job.Employer != null
                        ? src.Job.Employer.CompanyName
                        : ""))
            .ForMember(
                dest => dest.ResumeFile,
                opt => opt.MapFrom(
                    src => src.Resume != null
                        ? src.Resume.ResumeFile
                        : ""));


            CreateMap<Notification, NotificationResponseDto>();









        }
    }
}

