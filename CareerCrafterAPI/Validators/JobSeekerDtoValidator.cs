using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class JobSeekerCreateDtoValidator : AbstractValidator<JobSeekerCreateDto>
    {
        public JobSeekerCreateDtoValidator()
        {
            RuleFor(x => x.Phone).
                Matches(@"^[0-9]{10}$")
               .WithMessage("Phone number must be 10 digits");


            RuleFor(x => x.Address)
                .NotEmpty()
                .WithMessage("Address is required");

            RuleFor(x => x.Skills)
                .NotEmpty()
                .WithMessage("Skills are required");

            RuleFor(x => x.ExperienceYears)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Experience cannot be negative");

            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("Valid UserId is required");
        }
    }
}