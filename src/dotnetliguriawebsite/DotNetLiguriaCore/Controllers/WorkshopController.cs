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

        public WorkshopController(WorkshopService workshopService, SpeakerService speakerService)
        {
            _speakerService = speakerService;
            _workshopService = workshopService;
        }

        [HttpGet]
        public async Task<List<Workshop>> Get() =>
            await _workshopService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> Get(Guid id)
        {
            var Workshop = await _workshopService.GetAsync(id);

            if (Workshop is null)
            {
                return NotFound();
            }

            var speakers = await _speakerService.GetAsync();
            foreach (var track in Workshop.Tracks ?? [])
            {
                if (track.Speakers != null && track.Speakers.Count > 0)
                {
                    var speakerDetails = speakers.Where(s => track.Speakers.Contains(s.WorkshopSpeakerId)).Select(s => s.Name).Where(name => name != null).Cast<string>().ToList();
                    track.SpeakersDetails = speakerDetails;
                    track.SpeakersName = string.Join(", ", speakerDetails);
                }
            }


            return Workshop;
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
    }
}
