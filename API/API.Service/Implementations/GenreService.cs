using API.DAL.Interfaces;
using API.Domain.Entity;
using API.Domain.Response;
using API.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Service.Implementations
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository genreRepository;

        public GenreService(IGenreRepository genreRepository)
        {
            this.genreRepository = genreRepository;
        }

        public async Task<BaseResponse<IEnumerable<Genre>>> GetGenresAsync()
        {
            var baseResponse = new BaseResponse<IEnumerable<Genre>>();
            try
            {
                var genres = await genreRepository.GetGenresAsync();

                if (genres.Count == 0)
                {
                    baseResponse.Data = new List<Genre>();
                } baseResponse.Data = genres;

                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch(Exception ex)
            {
                return new BaseResponse<IEnumerable<Genre>>()
                {
                    DescriptionError = $"[GenreService.GetGenresAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }
    }
}
