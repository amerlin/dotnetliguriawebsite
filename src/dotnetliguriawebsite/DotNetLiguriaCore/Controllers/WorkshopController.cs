using DotNetLiguriaCore.Model;
using DotNetLiguriaCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLiguriaCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkshopController(WorkshopService workshopService, SpeakerService speakerService, WorkshopFileService workshopFileService, IWebHostEnvironment environment) : ControllerBase
    {
        private readonly WorkshopService _workshopService = workshopService;
        private readonly SpeakerService _speakerService = speakerService;
        private readonly WorkshopFileService _workshopFileService = workshopFileService;
        private readonly IWebHostEnvironment _environment = environment;

        [HttpGet]
        public async Task<List<Workshop>> Get()
        {
            var returnValue = await _workshopService.GetAsync();
            foreach (var workshop in returnValue)
            {
                await AddSpeakers(workshop);
                await AddFiles(workshop);
            }
            return returnValue;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> Get(Guid id)
        {
            var workshop = await _workshopService.GetAsync(id);

            if (workshop is null)
            {
                return NotFound();
            }

            await AddSpeakers(workshop);
            await AddFiles(workshop);

            return workshop;
        }

        [HttpGet("HomePage")]
        public async Task<ActionResult<Workshop>> GetInHomePage()
        {
            var workshop = await _workshopService.GetInHomePageAsync();

            if (workshop is null)
            {
                return NotFound();
            }

            await AddSpeakers(workshop);
            await AddFiles(workshop);

            return workshop;
        }

        [HttpGet("{year}")]
        public async Task<List<Workshop>> GetByYear(int year) =>
            await _workshopService.GetByYearAsync(year);

        [HttpPost]
        public async Task<IActionResult> Post(Workshop newWorkshop)
        {
            newWorkshop.WorkshopId = Guid.NewGuid();
            
            // TODO: Recuperare questo valore dinamicamente in seguito
            var newWorkshopNumber = 41;
            var folderName = $"workshop{newWorkshopNumber:000}";
            newWorkshop.FolderName = folderName;
            
            var workshopPath = Path.Combine(_environment.WebRootPath, "workshops", folderName);
            Directory.CreateDirectory(workshopPath);
            Directory.CreateDirectory(Path.Combine(workshopPath, "photos"));
            Directory.CreateDirectory(Path.Combine(workshopPath, "tracks"));

            newWorkshop.Image = "/workshops/workshop041/workshop.png";
            newWorkshop.ImageThumbnail = "/workshops/workshop041/workshop_thumb.png";
            newWorkshop.CreationDate = DateTime.Now;
            newWorkshop.Published = false;
            
            if (newWorkshop.Tracks != null)
            {
                foreach (var track in newWorkshop.Tracks)
                {
                    if (track.WorkshopTrackId == Guid.Empty)
                    {
                        track.WorkshopTrackId = Guid.NewGuid();
                    }
                }
            }
            
            await _workshopService.CreateAsync(newWorkshop);

            return CreatedAtAction(nameof(Get), new { id = newWorkshop.WorkshopId }, newWorkshop);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Workshop updatedWorkshop)
        {
            var Workshop = await _workshopService.GetAsync(id);

            if (Workshop is null)
            {
                return NotFound();
            }

            updatedWorkshop.WorkshopId = Workshop.WorkshopId;
            
            if (updatedWorkshop.Tracks != null)
            {
                foreach (var track in updatedWorkshop.Tracks)
                {
                    if (track.WorkshopTrackId == Guid.Empty)
                    {
                        track.WorkshopTrackId = Guid.NewGuid();
                    }
                }
            }

            await _workshopService.UpdateAsync(id, updatedWorkshop);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Workshop = await _workshopService.GetAsync(id);

            if (Workshop is null)
            {
                return NotFound();
            }

            await _workshopService.RemoveAsync(id);

            return NoContent();
        }

        private async Task AddFiles(Workshop workshop)
        {
            var workshopFiles = await _workshopFileService.GetAsync(workshop.WorkshopId);

            foreach (var file in workshopFiles)
            {
                if (file.FileType == WorkshopFileTypeEnum.Photo)
                {
                    workshop.Photos ??= [];
                    workshop.Photos.Add(file);
                }

                if (file.FileType == WorkshopFileTypeEnum.Material)
                {
                    workshop.Materials ??= [];
                    workshop.Materials.Add(file);
                }
            }
        }

        private async Task AddSpeakers(Workshop workshop)
        {
            var speakers = await _speakerService.GetAsync();
            foreach (var track in workshop.Tracks ?? [])
            {
                if (track.Speakers != null && track.Speakers.Count > 0)
                {
                    var speakerDetails = speakers.Where(s => track.Speakers.Contains(s.WorkshopSpeakerId)).Select(s => s.Name).Where(name => name != null).Cast<string>().ToList();
                    track.SpeakersDetails = speakerDetails;
                    track.SpeakersName = string.Join(", ", speakerDetails);
                }
            }
        }
    }
}