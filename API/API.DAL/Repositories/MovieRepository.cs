using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace API.DAL.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext db;

        public MovieRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<Movie> CreateAsync(Movie entity)
        {
            await db.Movies.AddAsync(entity);
            await db.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(Movie entity)
        {
            db.Movies.Remove(entity);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<Movie> GetMovieAsync(int id)
        {
            var movie = await db.Movies.FirstOrDefaultAsync(x => x.Id == id);
            movie.Actors = await db.ActorMovie.Where(am => am.MovieId == id).Select(am => am.Actor).ToListAsync();
            movie.Genres = await db.GenreMovie.Where(gm => gm.MovieId == id).Select(gm => gm.Genre).ToListAsync();

            return movie;
        }

        public async Task<bool> AddGenreAsync(GenreMovie genreMovie)
        {
            await db.GenreMovie.AddAsync(genreMovie);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddActorAsync(ActorMovie actorMovie)
        {
            await db.ActorMovie.AddAsync(actorMovie);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<List<Movie>> GetMoviesAsync(int[] ActorIds, int[] GenreIds, string title)
        {
            if (string.IsNullOrEmpty(title))
                title = "";

            var movies = await db.Movies
                                .Where(movie => movie.Title.ToLower().Contains(title.ToLower()))
                                .Include(m => m.Actors)
                                .Include(m => m.Genres)
                                .ToListAsync();

            var sortedMovies = movies
                                .Where(m => ActorIds.Length == 0 || ActorIds.All(ai => m.Actors.Any(a => a.Id == ai)))
                                .Where(m => GenreIds.Length == 0 || GenreIds.All(gi => m.Genres.Any(g => g.Id == gi)))
                                .ToList();

            return sortedMovies;
        }

        public async Task<Movie> UpdateAsync(Movie entity)
        {
            db.Movies.Update(entity);
            await db.SaveChangesAsync();

            return entity;
        }
    }
}
