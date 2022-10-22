using API.Domain.Entity;
using API.Domain.Response;
using API.Domain.ViewModels;
using System.Threading.Tasks;

namespace API.Service.Interfaces
{
    public interface IAuthService
    {
        Task<BaseResponse<User>> CreateAsync(RegisterViewModel model);
        Task<BaseResponse<User>> GetUserAsync(LoginViewModel model);
        Task<BaseResponse<User>> GetByLoginAsync(string login);
    }
}
