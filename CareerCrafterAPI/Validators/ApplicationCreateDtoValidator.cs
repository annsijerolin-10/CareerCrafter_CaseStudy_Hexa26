using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class ApplicationCreateDtoValidator : AbstractValidator<ApplicationCreateDto>
    {
        public ApplicationCreateDtoValidator()
        {
            RuleFor(x => x.JobId)
                .GreaterThan(0)
                .WithMessage("Valid JobId is required");

            RuleFor(x => x.JobSeekerId)
                .GreaterThan(0)
                .WithMessage("Valid JobSeekerId is required");
        }
    }
}