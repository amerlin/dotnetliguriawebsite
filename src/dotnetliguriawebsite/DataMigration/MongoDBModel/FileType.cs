using MongoDB.Bson.Serialization.Attributes;

namespace DotNetLiguria.MongoDBModel
{

    public class FileType
    {
        [BsonId]
        public int FileTypeId { get; set; }
        public string Name { get; set; } = null!;
    }
}
