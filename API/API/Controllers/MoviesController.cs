using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;
using API.Domain.ViewModels;
using System.Net.Http;
using System.Net;

namespace API.Controllers
{
    [Route("movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var response = await _movieService.GetMovieAsync(id);
            
            if(response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.NotFound(response.DescriptionError);
        }

        [HttpGet("last")]
        public async Task<ActionResult<Movie>> GetLastMovie()
        {
            var response = await _movieService.GetLastAsync();

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.NotFound(response.DescriptionError);
        }

        [HttpGet]
        public async Task<ActionResult<Movie>> GetMovies([FromQuery] int[] ActorIds, [FromQuery] int[] GenreIds, 
                                                        string title, int limit = 100, int page = 1)
        {
            var response = await _movieService.GetMoviesAsync(ActorIds, GenreIds, title, limit, page);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                Response.Headers["x-total-count"] = response.TotalCount.ToString();
                return this.Ok(response.Data);
            }

            return this.NotFound(response.DescriptionError);
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(MovieViewModel model)
        {
            var response = await _movieService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }

        [HttpPost("genres")]
        public async Task<ActionResult<Movie>> AddGenre(GenreMovie genreMovie)
        {
            var response = await _movieService.AddGenreAsync(genreMovie);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }

        [HttpPost("actors")]
        public async Task<ActionResult<Movie>> AddActor(ActorMovie actorMovie)
        {
            var response = await _movieService.AddActorAsync(actorMovie);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(int id)
        {
            var response = await _movieService.DeleteAsync(id);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return this.Ok(response.Data);

            return this.BadRequest(response.DescriptionError);
        }
    }
}
