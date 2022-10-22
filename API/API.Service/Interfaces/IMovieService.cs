using API.Domain.Entity;
using API.Domain.Response;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IMovieService
    {
        Task<BaseResponse<IEnumerable<Movie>>> GetMoviesAsync(int[] actorIds, int[] genreIds, string title, 
                                                              int limit, int page, int minPremiereYear, int maxPremiereYear);
        Task<BaseResponse<Movie>> GetMovieAsync(int id);
        Task<BaseResponse<Movie>> CreateAsync(MovieViewModel model);
        Task<BaseResponse<bool>> DeleteAsync(int id);
        Task<BaseResponse<bool>> EditAsync(int id, MovieViewModel model);
    }
}
