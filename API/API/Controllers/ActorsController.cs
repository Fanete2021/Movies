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
        private readonly IActorService _actorService;

        public ActorsController(IActorService actorsService)
        {
            _actorService = actorsService;
        }

        [HttpGet]
        public async Task<ActionResult<Actor>> GetActorsAsync([FromQuery] int[] bannedIds, string name, int limit = 100, int page = 1)
        {
            var response = await _actorService.GetActorsAsync(bannedIds, name, limit, page);

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
            var response = await _actorService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Movie>> ChangeActor(int id, ActorViewModel model)
        {
            var response = await _actorService.EditAsync(id, model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Actor>> DeleteActorAsync(int id)
        {
            var response = await _actorService.DeleteAsync(id);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }
    }
}
