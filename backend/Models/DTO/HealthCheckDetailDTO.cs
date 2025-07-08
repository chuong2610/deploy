namespace backend.Models.DTO
{
    public class HealthCheckDetailDTO
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string StudentNumber { get; set; } = string.Empty;
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public decimal VisionLeft { get; set; }
        public decimal VisionRight { get; set; }
        public decimal Bmi { get; set; }
        public string BloodPressure { get; set; } = string.Empty;
        public string HeartRate { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Conclusion { get; set; } = string.Empty;
        public string ResultAtHome { get; set; } = string.Empty;
        public int NurseId { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string NurseName { get; set; } = string.Empty;
    }
}
