using API.Domain.Entity;
using API.Domain.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IGenreService
    {
        Task<BaseResponse<IEnumerable<Genre>>> GetGenresAsync();
    }
}
