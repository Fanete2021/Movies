using API.Domain.Entity;
using API.Domain.Responce;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IMovieService
    {
        Task<BaseResponce<IEnumerable<Movie>>> GetMoviesAsync(int[] ActorIds, int[] GenreIds, string title, int limit, int page);
        Task<BaseResponce<Movie>> GetMovieAsync(int id);
        Task<BaseResponce<MovieViewModel>> CreateAsync(MovieViewModel model);
        Task<BaseResponce<GenreMovie>> AddGenreAsync(GenreMovie genreMovie);
        Task<BaseResponce<ActorMovie>> AddActorAsync(ActorMovie actorMovie);
        Task<BaseResponce<bool>> DeleteAsync(int id);
        Task<BaseResponce<Movie>> GetLastAsync();
        Task<BaseResponce<Movie>> EditAsync(int id, MovieViewModel model);
    }
}
