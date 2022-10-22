using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;
using API.Domain.ViewModels;

namespace API.Controllers
{
    [ApiController, Route("movies")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovieAsync(int id)
        {
            var response = await _movieService.GetMovieAsync(id);
            
            if(response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return NotFound(response.DescriptionError);
        }

        [HttpGet]
        public async Task<ActionResult<Movie>> GetMoviesAsync([FromQuery] int[] actorIds, [FromQuery] int[] genreIds, 
                                                        string title, int limit = 100, int page = 1, 
                                                        int minPremiereYear = 1895, int maxPremiereYear = 2030)
        {
            var response = await _movieService.GetMoviesAsync(actorIds, genreIds, title, limit, page, minPremiereYear, maxPremiereYear);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                Response.Headers["x-total-count"] = response.TotalCount.ToString();
                return Ok(response.Data);
            }

            return NotFound(response.DescriptionError);
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovieAsync(MovieViewModel model)
        {
            var response = await _movieService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Movie>> ChangeMovie(int id, MovieViewModel model)
        {
            var response = await _movieService.EditAsync(id, model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovieAsync(int id)
        {
            var response = await _movieService.DeleteAsync(id);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }
    }
}
