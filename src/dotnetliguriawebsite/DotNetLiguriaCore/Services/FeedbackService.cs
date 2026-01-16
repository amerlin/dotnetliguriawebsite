using DotNetLiguriaCore.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DotNetLiguriaCore.Services
{
    public class FeedbackService
    {
        private readonly IMongoCollection<Feedback> _feedbackCollection;

        public FeedbackService(IOptions<DotNetLiguriaDatabaseSettings> mongoDBDatabaseSettings)
        {
            var mongoClient = new MongoClient(mongoDBDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDBDatabaseSettings.Value.DatabaseName);

            _feedbackCollection = mongoDatabase.GetCollection<Feedback>(mongoDBDatabaseSettings.Value.FeedbackCollectionName);
        }

        public async Task<List<Feedback>> GetAsync() =>
            await _feedbackCollection.Find(_ => true).ToListAsync();

        public async Task<Feedback?> GetAsync(Guid id) =>
            await _feedbackCollection.Find(x => x.FeedbackId == id).FirstOrDefaultAsync();

        public async Task<List<Feedback>> GetByWorkshopAsync(Guid workshopId) =>
            await _feedbackCollection.Find(x => x.WorkshopId == workshopId).ToListAsync();

        public async Task<List<Feedback>> GetByWorkshopTrackAsync(Guid workshopId, Guid workshopTrackId) =>
            await _feedbackCollection.Find(x => x.WorkshopId == workshopId && x.WorkshopTrackId == workshopTrackId).ToListAsync();

        public async Task CreateAsync(Feedback newFeedback) =>
            await _feedbackCollection.InsertOneAsync(newFeedback);

        public async Task UpdateAsync(Guid id, Feedback updatedFeedback) =>
            await _feedbackCollection.ReplaceOneAsync(x => x.FeedbackId == id, updatedFeedback);

        public async Task RemoveAsync(Guid id) =>
            await _feedbackCollection.DeleteOneAsync(x => x.FeedbackId == id);
    }
}
