namespace DotNetLiguriaCore.Model
{
    public class WorkshopFeedbackStatistics
    {
        public Guid WorkshopId { get; set; }
        public required string WorkshopTitle { get; set; }
        public required List<TrackFeedbackStatistics> TrackStatistics { get; set; }
        public List<string> Notes { get; set; } = new();
    }

    public class TrackFeedbackStatistics
    {
        public Guid WorkshopTrackId { get; set; }
        public required string TrackTitle { get; set; }
        public Dictionary<int, int> RatingDistribution { get; set; } = new();
        public int TotalFeedbacks { get; set; }
        public double AverageRating { get; set; }
    }
}
