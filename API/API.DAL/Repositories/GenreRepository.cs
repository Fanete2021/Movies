using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace API.DAL.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ApplicationDbContext db;

        public GenreRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<Genre> CreateAsync(Genre entity)
        {
            await db.Genres.AddAsync(entity);
            entity.Id = await db.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(Genre entity)
        {
            db.Genres.Remove(entity);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<List<Genre>> GetGenresAsync()
        {
            return await db.Genres.ToListAsync();
        }

        public async Task<Genre> UpdateAsync(Genre entity)
        {
            db.Genres.Update(entity);
            await db.SaveChangesAsync();

            return entity;
        }
    }
}
