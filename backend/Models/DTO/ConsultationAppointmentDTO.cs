namespace backend.Models.DTO;
public class ConsultationAppointmentDTO
{
    public int ConsultationAppointmentId { get; set; }
    public string StudentNumber { get; set; } = string.Empty;
    public string StudentName { get; set; } = string.Empty;
    public string NurseName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
