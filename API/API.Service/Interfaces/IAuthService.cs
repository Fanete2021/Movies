using API.Domain.Entity;
using API.Domain.Responce;
using API.Domain.ViewModels;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IAuthService
    {
        Task<BaseResponce<User>> CreateAsync(RegisterViewModel model);
        Task<BaseResponce<User>> GetUserAsync(LoginViewModel model);
        Task<BaseResponce<User>> GetByLoginAsync(string login);
    }
}
