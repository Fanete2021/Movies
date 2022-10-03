using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;

namespace API.Controllers
{
    [ApiController, Route("genres")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<ActionResult<Movie>> GetGenresAsync()
        {
            var response = await _genreService.GetGenresAsync();

            if(response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return NotFound(response.DescriptionError);
        }
    }
}
