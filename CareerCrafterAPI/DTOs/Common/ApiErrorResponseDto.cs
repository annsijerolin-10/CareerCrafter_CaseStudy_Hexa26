namespace CareerCrafterAPI.DTOs.Common
{
    public class ApiErrorResponseDto
    {
        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;

        public string ErrorType { get; set; } = string.Empty;

        public string? Details { get; set; }

        public string TraceId { get; set; } = string.Empty;
    }
}
