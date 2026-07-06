using CareerCrafterAPI.DTOs;
using FluentValidation;

namespace CareerCrafterAPI.Validators
{
    public class ChangePasswordDtoValidator
        : AbstractValidator<ChangePasswordDto>
    {
        public ChangePasswordDtoValidator()
        {
            RuleFor(x => x.UserId)
                .GreaterThan(0);

            RuleFor(x => x.CurrentPassword)
                .NotEmpty()
                .WithMessage("Current Password is required.");

            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters.");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.NewPassword)
                .WithMessage("Passwords do not match.");
        }
    }
}