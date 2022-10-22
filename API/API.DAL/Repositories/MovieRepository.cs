using Microsoft.EntityFrameworkCore;
using API.DAL.Interfaces;
using API.Domain.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using API.Domain.ViewModels;

namespace API.DAL.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext db;

        public MovieRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<Movie> CreateAsync(MovieViewModel model)
        {
            var movie = new Movie()
            {
                Title = model.Title,
                Description = model.Description,
                PremiereYear = model.PremiereYear
            };
            await db.Movies.AddAsync(movie);
            await db.SaveChangesAsync();

            foreach (var genre in model.Genres)
            {
                var genreMovie = new GenreMovie()
                {
                    GenreId = genre.Id,
                    MovieId = movie.Id
                };
                await db.GenreMovie.AddAsync(genreMovie);
            }

            foreach (var actor in model.Actors)
            {
                var actorMovie = new ActorMovie()
                {
                    ActorId = actor.Id,
                    MovieId = movie.Id
                };
                await db.ActorMovie.AddAsync(actorMovie);
            }

            await db.SaveChangesAsync();

            return movie;
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

        public async Task<List<Movie>> GetMoviesAsync(int[] actorIds, int[] genreIds, string title, int minPremiereYear, int maxPremiereYear)
        {
            if (string.IsNullOrEmpty(title))
                title = "";

            var movies = await db.Movies
                                .Where(m => m.Title.ToLower().Contains(title.ToLower()))
                                .Where(m => m.PremiereYear >= minPremiereYear && m.PremiereYear <= maxPremiereYear)
                                .Include(m => m.Actors)
                                .Include(m => m.Genres)
                                .ToListAsync();

            var sortedMovies = movies
                                .Where(m => actorIds.Length == 0 || actorIds.All(ai => m.Actors.Any(a => a.Id == ai)))
                                .Where(m => genreIds.Length == 0 || genreIds.All(gi => m.Genres.Any(g => g.Id == gi)))
                                .ToList();

            return sortedMovies;
        }

        public async Task<bool> UpdateAsync(int id, MovieViewModel model)
        {
            var movie = await GetMovieAsync(id);

            if (movie == null)
            {
                return false;
            }

            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.PremiereYear = model.PremiereYear;
            db.Entry(movie).State = EntityState.Modified;

            var addedGenres = model.Genres
                            .Where(g => movie.Genres.FindIndex(mg => mg.Id == g.Id) == -1)
                            .ToList();
            foreach (var genre in addedGenres)
            {
                var genreMovie = new GenreMovie()
                {
                    GenreId = genre.Id,
                    MovieId = id
                };
                await db.GenreMovie.AddAsync(genreMovie);
            }

            var deletedGenres = movie.Genres
                            .Where(g => model.Genres.FindIndex(mg => mg.Id == g.Id) == -1)
                            .ToList();
            foreach (var genre in deletedGenres)
            {
                var genreMovie = db.GenreMovie.Where(gm => gm.GenreId == genre.Id && gm.MovieId == id);
                db.GenreMovie.RemoveRange(genreMovie);
            }

            var addedActors = model.Actors
                            .Where(a => movie.Actors.FindIndex(ma => ma.Id == a.Id) == -1)
                            .ToList();
            foreach (var actor in addedActors)
            {
                var actorMovie = new ActorMovie()
                {
                    ActorId = actor.Id,
                    MovieId = id
                };
                await db.ActorMovie.AddAsync(actorMovie);
            }

            var deletedActors = movie.Actors
                            .Where(a => model.Genres.FindIndex(ma => ma.Id == a.Id) == -1)
                            .ToList();
            foreach (var actor in deletedActors)
            {
                var actorMovie = db.ActorMovie.Where(gm => gm.ActorId == actor.Id && gm.MovieId == id);
                db.ActorMovie.RemoveRange(actorMovie);
            }

            await db.SaveChangesAsync();

            return true;
        }
    }
}
