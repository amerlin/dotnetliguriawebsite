namespace DotNetLiguriaCore.Model
{
    public class WorkshopFeedbackSummary
    {
        public Guid WorkshopId { get; set; }
        public required string Title { get; set; }
        public string? Date { get; set; }
    }
}
