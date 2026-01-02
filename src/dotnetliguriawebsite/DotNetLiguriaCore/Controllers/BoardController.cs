using DotNetLiguriaCore.Model;
using DotNetLiguriaCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLiguriaCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BoardController(BoardService boardService) : ControllerBase
    {
        private readonly BoardService _boardService = boardService;

        [HttpGet]
        public async Task<List<Board>> Get([FromQuery] bool onlyActive = false) =>
            await _boardService.GetAsync(onlyActive);

        [HttpGet("{id}")]
        public async Task<ActionResult<Board>> Get(Guid id)
        {
            var board = await _boardService.GetAsync(id);

            if (board is null)
            {
                return NotFound();
            }

            return board;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Board newBoard)
        {
            newBoard.BoardId = Guid.NewGuid();
            await _boardService.CreateAsync(newBoard);
            return CreatedAtAction(nameof(Get), new { id = newBoard.BoardId }, newBoard);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Board updateBoard)
        {
            var board = await _boardService.GetAsync(id);

            if (board is null)
            {
                return NotFound();
            }

            updateBoard.BoardId = board.BoardId;

            await _boardService.UpdateAsync(id, updateBoard);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var board = await _boardService.GetAsync(id);

            if (board is null)
            {
                return NotFound();
            }

            await _boardService.RemoveAsync(id);

            return NoContent();
        }
    }
}