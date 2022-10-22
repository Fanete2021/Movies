using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Threading.Tasks;

namespace API.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext db;

        public UserRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<User> CreateAsync(User user)
        {
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            return user;
        }

        public async Task<bool> DeleteAsync(User user)
        {
            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<User> GetByLoginAsync(string login)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == login);

            return user;
        }
    }
}
