using API.DAL.Interfaces;
using API.Domain.Entity;
using API.Domain.Responce;
using API.Domain.ViewModels;
using API.Service.Interfaces;
using System;
using System.Threading.Tasks;

namespace API.Service.Implementations
{
    public class AuthService : IAuthService
    {

        private readonly IUserRepository userRepository;

        public AuthService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<BaseResponce<User>> CreateAsync(RegisterViewModel model)
        {
            var baseResponse = new BaseResponce<User>();

            try
            {
                var user = new User
                {
                    Login = model.Login,
                    Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                    Role = model.Role
                };

                await userRepository.CreateAsync(user);

                baseResponse.Data = user;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<User>()
                {
                    DescriptionError = $"[AuthService.CreateAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.RegexNotMatch
                };
            }
        }

        public async Task<BaseResponce<User>> GetUserAsync(LoginViewModel model)
        {
            var baseResponse = new BaseResponce<User>();

            try
            {
                var user = await userRepository.GetByLoginAsync(model.Login);

                if (user == null)
                {
                    baseResponse.DescriptionError = "User not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.UserNotFound;

                    return baseResponse;
                }

                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {
                    baseResponse.DescriptionError = "Invalid Credentials";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.InvalidCredentials;

                    return baseResponse;
                }

                baseResponse.Data = user;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<User>()
                {
                    DescriptionError = $"[AuthService.GetUserAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }

        public async Task<BaseResponce<User>> GetByLoginAsync(string login)
        {
            var baseResponse = new BaseResponce<User>();

            try
            {
                var user = await userRepository.GetByLoginAsync(login);

                if (user == null)
                {
                    baseResponse.DescriptionError = "User not found";
                    baseResponse.StatusCode = Domain.Enum.StatusCode.UserNotFound;

                    return baseResponse;
                }

                baseResponse.Data = user;
                baseResponse.StatusCode = Domain.Enum.StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponce<User>()
                {
                    DescriptionError = $"[AuthService.GetByLoginAsync]: {ex.Message}",
                    StatusCode = Domain.Enum.StatusCode.InternalServerError
                };
            }
        }
    }
}
