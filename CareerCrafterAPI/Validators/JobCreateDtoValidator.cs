using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class JobCreateDtoValidator : AbstractValidator<JobCreateDto>
    {
        public JobCreateDtoValidator()
        {
            RuleFor(x => x.JobTitle)
                .NotEmpty()
                .WithMessage("Job Title is required");

            RuleFor(x => x.JobDescription)
                .NotEmpty()
                .WithMessage("Job Description is required");

            RuleFor(x => x.Location)
                .NotEmpty()
                .WithMessage("Location is required");

            RuleFor(x => x.Salary)
                .GreaterThan(0)
                .WithMessage("Salary must be greater than 0");

            RuleFor(x => x.EmployerId)
                .GreaterThan(0)
                .WithMessage("Valid EmployerId is required");
            RuleFor(x => x.RequiredSkills)
                .NotEmpty()
                .WithMessage("Required Skills are required");
        }
    }
}