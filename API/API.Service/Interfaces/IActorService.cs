using API.Domain.Entity;
using API.Domain.Responce;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IActorService
    {
        Task<BaseResponce<IEnumerable<Actor>>> GetActorsAsync(string name, int[] BannedIds, int limit, int page);
        Task<BaseResponce<Actor>> CreateAsync(ActorViewModel model);
        Task<BaseResponce<bool>> DeleteAsync(int id);
        Task<BaseResponce<Actor>> EditAsync(int id, ActorViewModel model);
    }
}
