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


            CreateMap<Employer, EmployerResponseDto>()
                .ForMember(
                    dest => dest.FullName,
                    opt => opt.MapFrom(src =>
                        src.User != null ? src.User.FullName : "")
                )
                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom(src =>
                        src.User != null ? src.User.Email : "")
                );

            CreateMap<EmployerCreateDto, Employer>();

            CreateMap<EmployerUpdateDto, Employer>();
            CreateMap<EmployerCreateDto, Employer>();

            CreateMap<Job, JobResponseDto>()
                .ForMember(
                    dest => dest.CompanyName,
                    opt => opt.MapFrom(
                        src => src.Employer != null
                            ? src.Employer.CompanyName
                            : ""
                    ))

    .ForMember(
        dest => dest.CompanyDescription,
        opt => opt.MapFrom(src => src.Employer != null ? src.Employer.CompanyDescription : "")
    );
            CreateMap<JobCreateDto, Job>();
            CreateMap<JobUpdateDto, Job>();

            CreateMap<JobSeeker, JobSeekerResponseDto>()

                .ForMember(
                    dest => dest.FullName,
                    opt => opt.MapFrom(src =>
                        src.User != null
                            ? src.User.FullName
                            : "")
                )

                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom(src =>
                        src.User != null
                            ? src.User.Email
                            : "")
                );
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
            CreateMap<EmployerNotification, EmployerNotificationDto>();









        }
    }
}

