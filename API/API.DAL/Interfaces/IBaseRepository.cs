using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task<bool> DeleteAsync(T entity);
    }
}
