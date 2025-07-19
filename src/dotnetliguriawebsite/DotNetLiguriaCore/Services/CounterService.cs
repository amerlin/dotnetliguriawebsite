using DotNetLiguriaCore;
using DotNetLiguriaCore.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DotNetLiguriaCore.Services
{
	public class CounterService
	{
		private readonly IMongoCollection<Counter> _counterCollection;

		public CounterService(IOptions<DotNetLiguriaDatabaseSettings> mongoDBDatabaseSettings)
		{
			var mongoClient = new MongoClient(mongoDBDatabaseSettings.Value.ConnectionString);
			var mongoDatabase = mongoClient.GetDatabase(mongoDBDatabaseSettings.Value.DatabaseName);

			_counterCollection = mongoDatabase.GetCollection<Counter>(mongoDBDatabaseSettings.Value.CounterCollectionName);
		}

		public async Task<List<Counter>> GetAsync() =>
			await _counterCollection.Find(_ => true).ToListAsync();

		public async Task<Counter?> GetAsync(Guid id) =>
			await _counterCollection.Find(x => x.CounterId == id).FirstOrDefaultAsync();

		public async Task<Counter?> GetByNameAsync(string name) =>
			await _counterCollection.Find(x => x.Name!.ToUpper() == name.Trim().ToUpper()).FirstOrDefaultAsync();

		public async Task CreateAsync(Counter newCounter) =>
			await _counterCollection.InsertOneAsync(newCounter);

		public async Task UpdateAsync(Guid id, Counter updatedCounter) =>
			await _counterCollection.ReplaceOneAsync(x => x.CounterId == id, updatedCounter);

	}
}