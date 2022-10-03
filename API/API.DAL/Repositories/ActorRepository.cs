using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace API.DAL.Repositories
{
    public class ActorRepository : IActorRepository
    {
        private readonly ApplicationDbContext db;

        public ActorRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<Actor> CreateAsync(Actor entity)
        {
            await db.Actors.AddAsync(entity);
            await db.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(Actor entity)
        {
            db.Actors.Remove(entity);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<Actor> GetActorAsync(int id)
        {
            return await db.Actors.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Actor>> GetActorsAsync(string name, int[] BannedIds)
        {
            return await db.Actors
                .Where(actor => BannedIds.Contains(actor.Id) == false && 
                                (actor.Name + ' ' + actor.Surname)
                                    .ToLower()
                                    .Contains(name.ToLower()))
                .ToListAsync();
        }

        public async Task<Actor> UpdateAsync(Actor entity)
        {
            db.Actors.Update(entity);
            await db.SaveChangesAsync();

            return entity;
        }
    }
}
