using CareerCrafterAPI.DTOs.Common;
using CareerCrafterAPI.Middleware;
using CareerCrafterAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Net;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace CareerCrafterAPI.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private IHostEnvironment _environment;
        public GlobalExceptionMiddleware(RequestDelegate next,ILogger<GlobalExceptionMiddleware> logger,IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }
        private async Task HandleExceptionAsync(
            HttpContext context,
            Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception occurred. Path: {Path}", context.Request.Path);

            context.Response.ContentType = "application/json";

            ApiErrorResponseDto response;

            switch (exception)
            {
                case KeyNotFoundException:

                    context.Response.StatusCode =
                        (int)HttpStatusCode.NotFound;

                    response = CreateResponse(
                        context,
                        "Resource not found",
                        "NotFoundError",
                        exception);

                    break;

                case ArgumentException:

                    context.Response.StatusCode =
                        (int)HttpStatusCode.BadRequest;

                    response = CreateResponse(
                        context,
                        "Invalid request",
                        "ValidationError",
                        exception);

                    break;

                case DbUpdateException dbEx:

                    context.Response.StatusCode =
                        (int)HttpStatusCode.InternalServerError;

                    response = new ApiErrorResponseDto
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Database operation failed",
                        ErrorType = "DatabaseError",
                        TraceId = context.TraceIdentifier,
                        Details = dbEx.InnerException?.Message ?? dbEx.Message
                    };
                    break;

                default:

                    context.Response.StatusCode =
                        (int)HttpStatusCode.InternalServerError;

                    response = CreateResponse(
                        context,
                        "An unexpected error occurred",
                        "ServerError",
                        exception);

                    break;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy =
                    JsonNamingPolicy.CamelCase
            };

            var json =
                JsonSerializer.Serialize(
                    response,
                    options);

            await context.Response.WriteAsync(json);
        }

        private ApiErrorResponseDto CreateResponse(
            HttpContext context,
            string message,
            string errorType,
            Exception exception)
        {
            return new ApiErrorResponseDto
            {
                StatusCode = context.Response.StatusCode,
                Message = message,
                ErrorType = errorType,
                TraceId = context.TraceIdentifier,

                Details =
                    _environment.IsDevelopment()
                    ? exception.Message
                    : null
            };
        }
    }
}
