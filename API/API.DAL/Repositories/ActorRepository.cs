using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using API.Domain.ViewModels;

namespace API.DAL.Repositories
{
    public class ActorRepository : IActorRepository
    {
        private readonly ApplicationDbContext db;

        public ActorRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<Actor> CreateAsync(Actor actor)
        {
            await db.Actors.AddAsync(actor);
            await db.SaveChangesAsync();

            return actor;
        }

        public async Task<bool> DeleteAsync(Actor actor)
        {
            db.Actors.Remove(actor);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<Actor> GetActorAsync(int id)
        {
            return await db.Actors.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Actor>> GetActorsAsync(int[] bannedIds, string name)
        {
            return await db.Actors
                .Where(actor => bannedIds.Contains(actor.Id) == false && 
                                (actor.Name + ' ' + actor.Surname)
                                    .ToLower()
                                    .Contains(name.ToLower()))
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(int id, ActorViewModel model)
        {
            var actor = await GetActorAsync(id);

            if (actor == null)
            {
                return false;
            }

            actor.Name = model.Name;
            actor.Surname = model.Surname;

            db.Entry(actor).State = EntityState.Modified;
            await db.SaveChangesAsync();

            return true;
        }
    }
}
