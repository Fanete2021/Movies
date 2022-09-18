using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IMovieRepository: IBaseRepository<Movie>
    {
        public Task<List<Movie>> SelectAsync(int[] ActorIds, int[] GenreIds, string title);
        public Task<bool> AddGenreAsync(GenreMovie genreMovie);
        public Task<bool> AddActorAsync(ActorMovie actorMovie);
    }
}
