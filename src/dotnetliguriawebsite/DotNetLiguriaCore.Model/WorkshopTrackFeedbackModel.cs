namespace DotNetLiguriaCore.Model
{
    public class WorkshopTrackFeedbackModel
    {
        public Guid WorkshopTrackId { get; set; }
        public required string Title { get; set; }
        public required string Speakers { get; set; }
    }
}