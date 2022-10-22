using API.DAL.Interfaces;
using API.Domain.Entity;
using API.Domain.Response;
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

        public MovieService(IMovieRepository movieRepository)
        {
            this.movieRepository = movieRepository;
        }

        public async Task<BaseResponse<IEnumerable<Movie>>> GetMoviesAsync(int[] actorIds, int[] genreIds, string title,
                                                              int limit, int page, int minPremiereYear, int maxPremiereYear)
        {
            var baseResponse = new BaseResponse<IEnumerable<Movie>>();
            try
            {
                var movies = await movieRepository.GetMoviesAsync(actorIds, genreIds, title, minPremiereYear, maxPremiereYear);

                if (movies == null)
                {
                    baseResponse.DescriptionError = "Movies not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                    return baseResponse;
                }

                baseResponse.Data = movies.Skip(limit * (page - 1)).Take(limit);
                baseResponse.TotalCount = movies.Count;

                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<Movie>>()
                {
                    DescriptionError = $"[MovieService.GetMoviesAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.MovieNotFound
                };
            }
        }

        public async Task<BaseResponse<Movie>> GetMovieAsync(int id)
        {
            var baseResponse = new BaseResponse<Movie>();

            try
            {
                var movie = await movieRepository.GetMovieAsync(id);

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
                return new BaseResponse<Movie>()
                {
                    DescriptionError = $"[MovieService.GetMovieAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponse<Movie>> CreateAsync(MovieViewModel model)
        {
            var baseResponse = new BaseResponse<Movie>();

            try
            {
                baseResponse.Data = await movieRepository.CreateAsync(model);
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<Movie>()
                {
                    DescriptionError = $"[MovieService.CreateAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(int id)
        {
            var baseResponse = new BaseResponse<bool>();

            try
            {
                var movie = await movieRepository.GetMovieAsync(id);

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
                return new BaseResponse<bool>()
                {
                    Data = false,
                    DescriptionError = $"[MovieService.DeleteAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponse<bool>> EditAsync(int id, MovieViewModel model)
        {
            var baseResponse = new BaseResponse<bool>();

            try
            {
                var response = await movieRepository.UpdateAsync(id, model);

                baseResponse.Data = response;
                if (response)
                    baseResponse.StatusCode = Domain.Enum.StatusCode.OK;
                else
                    baseResponse.StatusCode = Domain.Enum.StatusCode.MovieNotFound;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    DescriptionError = $"[MovieService.EditAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }
    }
}