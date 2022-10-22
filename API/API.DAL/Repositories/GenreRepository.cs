using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ApplicationDbContext db;

        public GenreRepository(ApplicationDbContext db)
        {
            this.db = db;
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
    }
}
