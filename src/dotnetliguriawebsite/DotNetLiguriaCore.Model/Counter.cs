using MongoDB.Bson.Serialization.Attributes;

namespace DotNetLiguriaCore.Model
{
	public class Counter
	{
		[BsonId]
		public Guid CounterId { get; set; }
		public string? Name { get; set; }
		public int? Value { get; set; }
	}
}