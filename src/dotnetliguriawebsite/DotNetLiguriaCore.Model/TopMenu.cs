using MongoDB.Bson.Serialization.Attributes;

namespace DotNetLiguriaCore.Model
{
    [BsonIgnoreExtraElements]
    public class TopMenu

    {
        [BsonId]
        public Guid TopMenuElementId { get; set; }
        public required string Name { get; set; }
        public required string Url { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
    }
}
