using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IActorRepository: IBaseRepository<Actor>
    {
        Task<List<Actor>> GetActorsAsync(string name, int[] BannedIds);
        Task<Actor> GetActorAsync(int id);
    }
}
