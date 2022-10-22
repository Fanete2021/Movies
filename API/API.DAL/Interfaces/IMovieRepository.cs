using API.Domain.Entity;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IMovieRepository: IBaseRepository<Movie>
    {
        Task<Movie> GetMovieAsync(int id);
        Task<List<Movie>> GetMoviesAsync(int[] actorIds, int[] genreIds, string title, int minPremiereYear, int maxPremiereYear);
        Task<bool> UpdateAsync(int id, MovieViewModel model);
        Task<Movie> CreateAsync(MovieViewModel model);
    }
}
