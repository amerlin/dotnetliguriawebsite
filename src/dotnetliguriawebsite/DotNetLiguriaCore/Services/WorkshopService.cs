using DotNetLiguriaCore.Model;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DotNetLiguriaCore.Services
{
    public class WorkshopService
    {
        private readonly IMongoCollection<Workshop> _workshopsCollection;

        public WorkshopService(IOptions<DotNetLiguriaDatabaseSettings> mongoDBDatabaseSettings)
        {
            var mongoClient = new MongoClient(mongoDBDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDBDatabaseSettings.Value.DatabaseName);
            _workshopsCollection = mongoDatabase.GetCollection<Workshop>(mongoDBDatabaseSettings.Value.WorkshopCollectionName);
        }

        public async Task<List<Workshop>> GetAsync()
        {
            return await _workshopsCollection
            .Find(a => a.Published == true)
            .SortByDescending(w => w.EventDate)
            .ToListAsync();
        }

        public async Task<List<Workshop>> GetByYearAsync(int year)
        {
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year + 1, 1, 1);

            return await _workshopsCollection
                .Find(w => w.Published == true && w.EventDate >= startDate && w.EventDate < endDate)
                .SortByDescending(w => w.EventDate)
                .ToListAsync();
        }

        public async Task<Workshop?> GetAsync(Guid id)
        {
            var returnValue = await FindBBsonIdAsync(id);

            if (returnValue is null)
            {
                return null;
            }

            return returnValue;
        }

        public async Task<Workshop?> GetInHomePageAsync()
        {
            var returnValue = await _workshopsCollection
                .Find(w => w.Published == true && w.In_homepage == true)
                .SortByDescending(w => w.EventDate)
                .FirstOrDefaultAsync();

            if (returnValue is null)
            {
                return null;
            }

            return returnValue;
        }

        public async Task CreateAsync(Workshop newWorkshop) =>
            await _workshopsCollection.InsertOneAsync(newWorkshop);

        public async Task UpdateAsync(Guid id, Workshop updateWorkshop) =>
            await _workshopsCollection.ReplaceOneAsync(x => x.WorkshopId == id, updateWorkshop);

        public async Task RemoveAsync(Guid id) =>
            await _workshopsCollection.DeleteOneAsync(x => x.WorkshopId == id);


        private async Task<Workshop?> FindBBsonIdAsync(Guid workshopId)
        {

            var bsonBinaryData = new BsonBinaryData(workshopId, GuidRepresentation.Standard);
            var filter = Builders<Workshop>.Filter.Eq("_id", bsonBinaryData);
            return await _workshopsCollection.Find(filter).FirstOrDefaultAsync();
        }

    }
}
