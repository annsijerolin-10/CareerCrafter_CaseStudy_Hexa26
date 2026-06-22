using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Full Name is required");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required")
                .EmailAddress()
                .WithMessage("Invalid email format");

            RuleFor(x => x.Password)
                 .NotEmpty()
                 .WithMessage("Password is required")
                 .MinimumLength(6)
                 .WithMessage("Password must be at least 6 characters");

            RuleFor(x => x.Role)
                .NotEmpty()
                .WithMessage("Role is required")
                .Must(role =>
                    role?.ToLower() == "employer" ||
                    role?.ToLower() == "jobseeker")
                .WithMessage("Role must be Employer or JobSeeker");
        }
    }
}