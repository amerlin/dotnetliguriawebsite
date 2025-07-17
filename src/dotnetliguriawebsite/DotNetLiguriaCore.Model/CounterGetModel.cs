using MongoDB.Bson.Serialization.Attributes;

namespace DotNetLiguriaCore.Model
{
	public class CounterGetModel
	{
		[BsonId]
		public Guid CounterId { get; set; }
		public string? Name { get; set; }
		public int? Value { get; set; }

		[BsonIgnore]
		public string ValueString => Value.HasValue ? Value.Value.ToString("D3") : "000";
	}
}