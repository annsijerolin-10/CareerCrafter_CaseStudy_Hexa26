using Asp.Versioning;
using CareerCrafterAPI.Data;
using CareerCrafterAPI.Mappings;
using CareerCrafterAPI.Middleware;
using CareerCrafterAPI.Repositories.Implementations;
using CareerCrafterAPI.Repositories.Interfaces;
using CareerCrafterAPI.Services.Implementations;
using CareerCrafterAPI.Services.Interfaces;
using CareerCrafterAPI.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<CareerCrafterDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("CareerCrafterConnection")));



builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();



builder.Services.AddScoped<IEmployerRepository, EmployerRepository>();
builder.Services.AddScoped<IEmployerService, EmployerService>();

builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IJobService, JobService>();

builder.Services.AddScoped<IJobSeekerRepository, JobSeekerRepository>();
builder.Services.AddScoped<IJobSeekerService, JobSeekerService>();

builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();

builder.Services.AddScoped<IResumeRepository, ResumeRepository>();
builder.Services.AddScoped<IResumeService, ResumeService>();

builder.Services.AddScoped<IAuthRepository, AuthRepository>();

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddScoped<IEmployerNotificationRepository, EmployerNotificationRepository>();

builder.Services.AddScoped<IEmployerNotificationService, EmployerNotificationService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5173").AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();

    });
});




builder.Services.AddAutoMapper(cfg => { cfg.AddProfile<MappingProfile>(); });

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<UserCreateDtoValidator>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    string issuer = builder.Configuration["JwtSettings:Issuer"]!;
    string audience = builder.Configuration["JwtSettings:Audience"]!;
    string secretKey = builder.Configuration["JwtSettings:SecretKey"]!;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = issuer,

        ValidateAudience = true,
        ValidAudience = audience,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

});





builder.Services.AddAuthorization();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token only. Do not type Bearer manually."
    });

    //to get an option to give the token in the ui
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
              {
                   {
                       new OpenApiSecurityScheme
                         {
                            Reference = new OpenApiReference
                                {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                }
                            },
                          Array.Empty<string>()
                   }
             });
});
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

//builder.Services.AddApiVersioning(options =>
//{
//    options.DefaultApiVersion = new ApiVersion(1, 0);
//    options.AssumeDefaultVersionWhenUnspecified = true;
//    options.ReportApiVersions = true;
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowReactApp");

app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();

app.Run();
