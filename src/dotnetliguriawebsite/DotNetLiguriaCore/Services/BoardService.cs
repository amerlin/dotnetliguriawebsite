using DotNetLiguriaCore.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DotNetLiguriaCore.Services
{
    public class BoardService
    {
        private readonly IMongoCollection<Board> _boardCollection;

        public BoardService(IOptions<DotNetLiguriaDatabaseSettings> mongoDBDatabaseSettings)
        {
            var mongoClient = new MongoClient(mongoDBDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDBDatabaseSettings.Value.DatabaseName);

            _boardCollection = mongoDatabase.GetCollection<Board>(mongoDBDatabaseSettings.Value.BoardCollectionName);
        }

        public async Task<List<Board>> GetAsync() =>
            await _boardCollection.Find(_ => true).ToListAsync();

        public async Task<Board?> GetAsync(Guid id) =>
            await _boardCollection.Find(x => x.BoardId == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Board newWorkshop) =>
            await _boardCollection.InsertOneAsync(newWorkshop);

        public async Task UpdateAsync(Guid id, Board updatedWorkshop) =>
            await _boardCollection.ReplaceOneAsync(x => x.BoardId == id, updatedWorkshop);

        public async Task RemoveAsync(Guid id) =>
            await _boardCollection.DeleteOneAsync(x => x.BoardId == id);
    }
}