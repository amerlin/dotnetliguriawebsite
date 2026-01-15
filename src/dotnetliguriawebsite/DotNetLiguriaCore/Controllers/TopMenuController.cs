using DotNetLiguriaCore.Model;
using DotNetLiguriaCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLiguriaCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopMenuController(TopMenuService topMenuService) : ControllerBase
    {
        private readonly TopMenuService _topMenuService = topMenuService;

        [HttpGet]
        public async Task<List<TopMenu>> Get([FromQuery] bool onlyActive = false) =>
            await _topMenuService.GetAsync(onlyActive);

        [HttpGet("{id}")]
        public async Task<ActionResult<TopMenu>> Get(Guid id)
        {
            var topMenuElement = await _topMenuService.GetAsync(id);

            if (topMenuElement is null)
            {
                return NotFound();
            }

            return topMenuElement;
        }

        [HttpPost]
        public async Task<IActionResult> Post(TopMenu newTopMenuElement)
        {
            newTopMenuElement.TopMenuElementId = Guid.NewGuid();
            await _topMenuService.CreateAsync(newTopMenuElement);
            return CreatedAtAction(nameof(Get), new { id = newTopMenuElement.TopMenuElementId }, newTopMenuElement);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, TopMenu updatedTopMenuElement)
        {
            var topMenuElement = await _topMenuService.GetAsync(id);

            if (topMenuElement is null)
            {
                return NotFound();
            }

            updatedTopMenuElement.TopMenuElementId = topMenuElement.TopMenuElementId;

            await _topMenuService.UpdateAsync(id, updatedTopMenuElement);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var topMenuElement = await _topMenuService.GetAsync(id);

            if (topMenuElement is null)
            {
                return NotFound();
            }

            await _topMenuService.RemoveAsync(id);

            return NoContent();
        }
    }
}
