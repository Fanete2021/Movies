using API.Domain.Entity;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IActorRepository: IBaseRepository<Actor>
    {
        Task<List<Actor>> GetActorsAsync(int[] bannedIds, string name);
        Task<Actor> GetActorAsync(int id);
        Task<bool> UpdateAsync(int id, ActorViewModel model);
        Task<Actor> CreateAsync(Actor actor);
    }
}
