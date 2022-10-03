using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace API.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext db;

        public UserRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<User> CreateAsync(User entity)
        {
            await db.Users.AddAsync(entity);
            await db.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(User entity)
        {
            db.Users.Remove(entity);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<User> UpdateAsync(User entity)
        {
            db.Users.Update(entity);
            await db.SaveChangesAsync();

            return entity;
        }

        public async Task<User> GetByLoginAsync(string login)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == login);

            return user;
        }
    }
}
