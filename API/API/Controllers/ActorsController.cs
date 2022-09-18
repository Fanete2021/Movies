using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;
using API.Domain.ViewModels;

namespace API.Controllers
{
    [Route("actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly IActorService _actorsService;

        public ActorsController(IActorService actorsService)
        {
            _actorsService = actorsService;
        }

        [HttpGet]
        public async Task<ActionResult<Actor>> GetActors(string name, [FromQuery] int[] BannedIds, int limit = 100, int page = 1)
        {
            if (name == null)
                name = "";
            
            var response = await _actorsService.GetActorsAsync(name, BannedIds, limit, page);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                Response.Headers["x-total-count"] = response.TotalCount.ToString();
                return this.Ok(response.Data);
            }

            return this.NotFound(response.DescriptionError);
        }

        [HttpGet("last")]
        public async Task<ActionResult<Actor>> GetLastActor()
        {
            var response = await _actorsService.GetLastAsync();

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.NotFound(response.DescriptionError);
        }

        [HttpPost]
        public async Task<ActionResult<Actor>> CreateActor(ActorViewModel model)
        {
            var response = await _actorsService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Actor>> DeleteActor(int id)
        {
            var response = await _actorsService.DeleteAsync(id);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }
    }
}
