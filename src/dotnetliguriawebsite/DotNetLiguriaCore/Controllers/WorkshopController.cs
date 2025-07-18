using DotNetLiguriaCore.Model;
using DotNetLiguriaCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLiguriaCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkshopController : ControllerBase
    {
        private readonly WorkshopService _workshopService;
        private readonly SpeakerService _speakerService;
        private readonly WorkshopFileService _workshopFileService;

        public WorkshopController(WorkshopService workshopService, SpeakerService speakerService, WorkshopFileService workshopFileService)
        {
            _speakerService = speakerService;
            _workshopService = workshopService;
            _workshopFileService = workshopFileService;
        }

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



        [HttpGet("{year}")]
        public async Task<List<Workshop>> GetByYear(int year) =>
            await _workshopService.GetByYearAsync(year);

        [HttpPost]
        public async Task<IActionResult> Post(Workshop newWorkshop)
        {
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
            Console.WriteLine("Files WorkshopId: " + workshop.WorkshopId);
            var workshopFiles = await _workshopFileService.GetAsync(workshop.WorkshopId);
            Console.WriteLine("Files Count: " + workshopFiles.Count);

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