using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IMovieRepository: IBaseRepository<Movie>
    {
        Task<Movie> GetMovieAsync(int id);
        Task<List<Movie>> GetMoviesAsync(int[] ActorIds, int[] GenreIds, string title);
        Task<bool> AddGenreAsync(GenreMovie genreMovie);
        Task<bool> AddActorAsync(ActorMovie actorMovie);
    }
}
