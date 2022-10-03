using API.Domain.Entity;
using API.Domain.Responce;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IGenreService
    {
        Task<BaseResponce<IEnumerable<Genre>>> GetGenresAsync();
    }
}
