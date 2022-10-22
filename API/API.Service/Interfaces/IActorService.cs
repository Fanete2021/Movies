using API.Domain.Entity;
using API.Domain.Response;
using API.Domain.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IActorService
    {
        Task<BaseResponse<IEnumerable<Actor>>> GetActorsAsync(int[] bannedIds, string name, int limit, int page);
        Task<BaseResponse<Actor>> CreateAsync(ActorViewModel model);
        Task<BaseResponse<bool>> DeleteAsync(int id);
        Task<BaseResponse<bool>> EditAsync(int id, ActorViewModel model);
    }
}
