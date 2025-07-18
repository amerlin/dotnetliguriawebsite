namespace DotNetLiguriaCore.Model
{
	public class WorkshopFile
	{
		public Guid WorkshopFileId { get; set; }

		public Guid WorkshopId { get; set; }
		public string? Title { get; set; }
		public string? FileName { get; set; }
		public string? FullPath { get; set; }
		public WorkshopFileTypeEnum FileType { get; set; } // 0 = File, 1 = Image, 2 = Video
	}
}