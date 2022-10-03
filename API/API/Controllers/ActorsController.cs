using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;
using API.Domain.ViewModels;

namespace API.Controllers
{
    [ApiController, Route("actors")]
    public class ActorsController : ControllerBase
    {
        private readonly IActorService _actorsService;

        public ActorsController(IActorService actorsService)
        {
            _actorsService = actorsService;
        }

        [HttpGet]
        public async Task<ActionResult<Actor>> GetActorsAsync(string name, [FromQuery] int[] BannedIds, int limit = 100, int page = 1)
        {
            var response = await _actorsService.GetActorsAsync(name, BannedIds, limit, page);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                Response.Headers["x-total-count"] = response.TotalCount.ToString();
                return Ok(response.Data);
            }

            return NotFound(response.DescriptionError);
        }

        [HttpPost]
        public async Task<ActionResult<Actor>> CreateActorAsync(ActorViewModel model)
        {
            var response = await _actorsService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Actor>> DeleteActorAsync(int id)
        {
            var response = await _actorsService.DeleteAsync(id);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }
    }
}
