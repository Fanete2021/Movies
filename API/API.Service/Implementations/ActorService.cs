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
    public class ActorService : IActorService
    {
        private readonly IActorRepository actorRepository;

        public ActorService(IActorRepository actorRepository)
        {
            this.actorRepository = actorRepository;
        }

        public async Task<BaseResponse<IEnumerable<Actor>>> GetActorsAsync(int[] bannedIds, string name, int limit, int page)
        {
            var baseResponse = new BaseResponse<IEnumerable<Actor>>();

            try
            {
                if (name == null)
                    name = "";

                var actors = await actorRepository.GetActorsAsync(bannedIds, name);

                if (actors == null)
                {
                    baseResponse.DescriptionError = "Actors not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.ActorNotFound;

                    return baseResponse;
                }

                baseResponse.Data = actors.Skip(limit * (page - 1)).Take(limit);
                baseResponse.TotalCount = actors.Count;

                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<Actor>>()
                {
                    DescriptionError = $"[ActorService.GetActorsAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponse<Actor>> CreateAsync(ActorViewModel model)
        {
            var baseResponse = new BaseResponse<Actor>();

            try
            {
                var actor = new Actor
                {
                    Name = model.Name,
                    Surname = model.Surname,
                };

                baseResponse.Data = await actorRepository.CreateAsync(actor);
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<Actor>()
                {
                    DescriptionError = $"[ActorService.CreateAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(int id)
        {
            var baseResponse = new BaseResponse<bool>();

            try
            {
                var movie = await actorRepository.GetActorAsync(id);

                if (movie == null)
                {
                    baseResponse.DescriptionError = "Actor not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.ActorNotFound;

                    return baseResponse;
                }

                await actorRepository.DeleteAsync(movie);

                baseResponse.Data = true;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Data = false,
                    DescriptionError = $"[ActorService.DeleteAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponse<bool>> EditAsync(int id, ActorViewModel model)
        {
            var baseResponse = new BaseResponse<bool>();

            try
            {
                var response = await actorRepository.UpdateAsync(id, model);

                baseResponse.Data = response;
                if (response)
                    baseResponse.StatusCode = Domain.Enum.StatusCode.OK;
                else
                    baseResponse.StatusCode = Domain.Enum.StatusCode.ActorNotFound;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    DescriptionError = $"[ActorService.EditAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }
    }
}
