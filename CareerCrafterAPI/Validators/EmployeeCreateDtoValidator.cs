using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class EmployerCreateDtoValidator : AbstractValidator<EmployerCreateDto>
    {
        public EmployerCreateDtoValidator()
        {
            RuleFor(x => x.CompanyName)
                .NotEmpty()
                .WithMessage("Company Name is required");

            RuleFor(x => x.CompanyDescription)
                .NotEmpty()
                .WithMessage("Company Description is required");

            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("Valid UserId is required");
        }
    }
}