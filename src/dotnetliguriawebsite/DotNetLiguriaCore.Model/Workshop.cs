using MongoDB.Bson.Serialization.Attributes;

namespace DotNetLiguriaCore.Model
{
    public class Workshop
    {
        [BsonId]
        public Guid WorkshopId { get; set; }

        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? EventDate { get; set; }
        public string? BlogHtml { get; set; }
        public string? ImageOld { get; set; }

        public string? ImageThumbnail { get; set; }

        public string? Image { get; set; }
        public string? Tags { get; set; }
        public bool? Published { get; set; }
        public bool? IsExternalEvent { get; set; }
        public bool? ExternalRegistration { get; set; }
        public string? ExternalRegistrationLink { get; set; }

        public bool? OnlyHtml { get; set; }

        public Location? Location { get; set; }

        public List<WorkshopTrack>? Tracks { get; set; }

        public string? OldUrl { get; set; }
        public string? Slug { get; set; }

    }
}
