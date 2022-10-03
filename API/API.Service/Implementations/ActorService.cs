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
    public class ActorService : IActorService
    {
        private readonly IActorRepository actorRepository;

        public ActorService(IActorRepository actorRepository)
        {
            this.actorRepository = actorRepository;
        }

        public async Task<BaseResponce<IEnumerable<Actor>>> GetActorsAsync(string name, int[] BannedIds, int limit, int page)
        {
            var baseResponse = new BaseResponce<IEnumerable<Actor>>();

            try
            {
                if (name == null)
                    name = "";

                var actors = await actorRepository.GetActorsAsync(name, BannedIds);

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
                return new BaseResponce<IEnumerable<Actor>>()
                {
                    DescriptionError = $"[ActorService.GetActorsAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<Actor>> CreateAsync(ActorViewModel model)
        {
            var baseResponse = new BaseResponce<Actor>();

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
                return new BaseResponce<Actor>()
                {
                    DescriptionError = $"[ActorService.CreateAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }

        public async Task<BaseResponce<bool>> DeleteAsync(int id)
        {
            var baseResponse = new BaseResponce<bool>();

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
                return new BaseResponce<bool>()
                {
                    Data = false,
                    DescriptionError = $"[ActorService.DeleteAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<Actor>> EditAsync(int id, ActorViewModel model)
        {
            var baseResponse = new BaseResponce<Actor>();

            try
            {
                var actor = await actorRepository.GetActorAsync(id);

                if (actor == null)
                {
                    baseResponse.DescriptionError = "Actor not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.ActorNotFound;

                    return baseResponse;
                }

                actor.Name = model.Name;
                actor.Surname = model.Surname;

                await actorRepository.UpdateAsync(actor);

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<Actor>()
                {
                    DescriptionError = $"[ActorService.EditAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.DataWithErrors
                };
            }
        }
    }
}
