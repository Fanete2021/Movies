using API.Domain.Entity;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IUserRepository: IBaseRepository<User>
    {
        Task<User> GetByLoginAsync(string login);
    }
}
