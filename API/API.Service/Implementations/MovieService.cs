using API.DAL.Interfaces;
using API.Domain.Entity;
using API.Domain.Responce;
using API.Domain.ViewModels;
using API.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace API.Service.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository movieRepository;

        public MovieService(IMovieRepository movieRepository, IActorRepository actorRepository, IGenreRepository genreRepository)
        {
            this.movieRepository = movieRepository;
        }

        public async Task<BaseResponce<IEnumerable<Movie>>> GetMoviesAsync(int[] ActorsIds, int[] GenreIds, string title, int limit, int page)
        {
            var baseResponse = new BaseResponce<IEnumerable<Movie>>();
            try
            {
                var movies = await movieRepository.SelectAsync(ActorsIds, GenreIds, title);

                baseResponse.Data = movies.Skip(limit * (page - 1)).Take(limit);
                baseResponse.TotalCount = movies.Count;

                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<IEnumerable<Movie>>()
                {
                    DescriptionError = $"[MovieService.GetMoviesAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<Movie>> GetMovieAsync(int id)
        {
            var baseResponse = new BaseResponce<Movie>();

            try
            {
                var movie = await movieRepository.GetAsync(id);

                if(movie == null)
                {
                    baseResponse.DescriptionError = "Movie not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                    return baseResponse;
                }

                baseResponse.Data = movie;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch(Exception ex)
            {
                return new BaseResponce<Movie>()
                {
                    DescriptionError = $"[MovieService.GetMovieAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<Movie>> GetLastAsync()
        {
            var baseResponse = new BaseResponce<Movie>();
            try
            {
                var movie = await movieRepository.GetLastAsync();

                if (movie == null)
                {
                    baseResponse.DescriptionError = "Movie not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                    return baseResponse;
                }

                baseResponse.Data = movie;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<Movie>()
                {
                    DescriptionError = $"[MovieService.GetLastAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<MovieViewModel>> CreateAsync(MovieViewModel model)
        {
            var baseResponse = new BaseResponce<MovieViewModel>();

            try
            {
                var movie = new Movie
                {
                    Title = model.Title,
                    Description = model.Description,
                    PremiereYear = model.PremiereYear,
                };

                await movieRepository.CreateAsync(movie);

                baseResponse.Data = model;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<MovieViewModel>()
                {
                    DescriptionError = $"[MovieService.CreateAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }

        public async Task<BaseResponce<GenreMovie>> AddGenreAsync(GenreMovie genreMovie)
        {
            var baseResponse = new BaseResponce<GenreMovie>();

            try
            {
                await movieRepository.AddGenreAsync(genreMovie);

                baseResponse.Data = genreMovie;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<GenreMovie>()
                {
                    DescriptionError = $"[MovieService.AddGenreAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }
        public async Task<BaseResponce<ActorMovie>> AddActorAsync(ActorMovie actorMovie)
        {
            var baseResponse = new BaseResponce<ActorMovie>();

            try
            {
                await movieRepository.AddActorAsync(actorMovie);

                baseResponse.Data = actorMovie;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<ActorMovie>()
                {
                    DescriptionError = $"[MovieService.AddActorAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }

        public async Task<BaseResponce<bool>> DeleteAsync(int id)
        {
            var baseResponse = new BaseResponce<bool>();

            try
            {
                var movie = await movieRepository.GetAsync(id);

                if (movie == null)
                {
                    baseResponse.DescriptionError = "Movie not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                    return baseResponse;
                }

                await movieRepository.DeleteAsync(movie);

                baseResponse.Data = true;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<bool>()
                {
                    Data = false,
                    DescriptionError = $"[MovieService.DeleteAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<Movie>> EditAsync(int id, MovieViewModel model)
        {
            var baseResponse = new BaseResponce<Movie>();

            try
            {
                var movie = await movieRepository.GetAsync(id);

                if (movie == null)
                {
                    baseResponse.DescriptionError = "Movie not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                    return baseResponse;
                }

                movie.Title = model.Title;
                movie.Description = model.Description;
                movie.PremiereYear = model.PremiereYear;

                await movieRepository.UpdateAsync(movie);

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<Movie>()
                {
                    DescriptionError = $"[MovieService.EditAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }
    }
}
