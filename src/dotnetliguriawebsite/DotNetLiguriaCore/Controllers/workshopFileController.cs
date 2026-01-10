using DotNetLiguriaCore.Model;
using DotNetLiguriaCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLiguriaCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkshopFileController(WorkshopService workshopService, WorkshopFileService workshopFileService, IWebHostEnvironment environment) : ControllerBase
    {
        private readonly WorkshopService _workshopService = workshopService;
        private readonly WorkshopFileService _workshopFileService = workshopFileService;
        private readonly IWebHostEnvironment _environment = environment;

        [HttpGet("{workshopId}")]
        public async Task<ActionResult<List<WorkshopFile>>> Get(Guid workshopId)
        {
            if (workshopId == Guid.Empty)
            {
                return BadRequest("Workshop ID is required.");
            }

            var files = await _workshopFileService.GetAsync(workshopId);
            return Ok(files);
        }

        [HttpPost("UploadWorkshopImage")]
        public async Task<IActionResult> UploadWorkshopImage(IFormFile file, [FromForm] Guid workshopId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            
            if (workshopId == Guid.Empty)
            {
                return BadRequest("Workshop ID is required.");
            }

            var workshop = await _workshopService.GetAsync(workshopId);
            
            if (workshop is null)
            {
                return NotFound("Workshop not found.");
            }
            
            if (string.IsNullOrEmpty(workshop.FolderName))
            {
                return BadRequest("Workshop folder name is not set.");
            }

            var workshopPath = Path.Combine(_environment.WebRootPath, "workshops", workshop.FolderName);
            
            if (!Directory.Exists(workshopPath))
            {
                return BadRequest("Workshop folder does not exist.");
            }

            var fileName = "workshop.png";
            var filePath = Path.Combine(workshopPath, fileName);
            
            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/workshops/{workshop.FolderName}/{fileName}";
            
            await _workshopService.UpdateImageAsync(workshopId, relativePath);
            
            return Ok(new 
            { 
                fileName, 
                filePath = relativePath, 
                workshopId
            });
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Upload(IFormFile file, [FromForm] Guid workshopId, [FromForm] int fileType, [FromForm] string? title)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            
            if (workshopId == Guid.Empty)
            {
                return BadRequest("Workshop ID is required.");
            }

            var workshop = await _workshopService.GetAsync(workshopId);
            
            if (workshop is null)
            {
                return NotFound("Workshop not found.");
            }
            
            if (string.IsNullOrEmpty(workshop.FolderName))
            {
                return BadRequest("Workshop folder name is not set.");
            }

            var workshopPath = Path.Combine(_environment.WebRootPath, "workshops", workshop.FolderName);
            
            if (!Directory.Exists(workshopPath))
            {
                return BadRequest("Workshop folder does not exist.");
            }

            string subFolder = fileType switch
            {
                4 => "photos",
                3 => "tracks",
                _ => ""
            };

            string targetPath;
            string relativePath;

            if (!string.IsNullOrEmpty(subFolder))
            {
                targetPath = Path.Combine(workshopPath, subFolder);
                
                if (!Directory.Exists(targetPath))
                {
                    Directory.CreateDirectory(targetPath);
                }
                
                relativePath = $"/workshops/{workshop.FolderName}/{subFolder}/{file.FileName}";
            }
            else
            {
                targetPath = workshopPath;
                relativePath = $"/workshops/{workshop.FolderName}/{file.FileName}";
            }

            var filePath = Path.Combine(targetPath, file.FileName);
            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var workshopFile = new WorkshopFile
            {
                WorkshopFileId = Guid.NewGuid(),
                WorkshopId = workshopId,
                Title = title ?? file.FileName,
                FileName = file.FileName,
                FullPath = relativePath,
                FileType = (WorkshopFileTypeEnum)fileType
            };

            await _workshopFileService.CreateAsync(workshopFile);
            
            return Ok(new 
            { 
                file.FileName, 
                filePath = relativePath, 
                workshopId, 
                fileType,
                workshopFileId = workshopFile.WorkshopFileId 
            });
        }

        [HttpDelete("{workshopFileId}")]
        public async Task<IActionResult> Delete(Guid workshopFileId)
        {
            if (workshopFileId == Guid.Empty)
            {
                return BadRequest("WorkshopFile ID is required.");
            }

            var files = await _workshopFileService.GetAsync();
            var workshopFile = files.FirstOrDefault(f => f.WorkshopFileId == workshopFileId);

            if (workshopFile is null)
            {
                return NotFound("WorkshopFile not found.");
            }

            if (!string.IsNullOrEmpty(workshopFile.FullPath))
            {
                var physicalPath = Path.Combine(_environment.WebRootPath, workshopFile.FullPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

                if (System.IO.File.Exists(physicalPath))
                {
                    try
                    {
                        System.IO.File.Delete(physicalPath);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Error deleting physical file: {ex.Message}");
                    }
                }
            }

            await _workshopFileService.DeleteAsync(workshopFileId);

            return NoContent();
        }
    }
}
