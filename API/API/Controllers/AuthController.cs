using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain.Entity;
using API.Service.Interfaces;
using API.Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using System;

namespace API.Controllers
{
    [ApiController, Route("auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;

        public AuthController(IAuthService authService, IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost, Route("register")]
        public async Task<ActionResult<User>> RegisterAsync(RegisterViewModel model)
        {
            var response = await _authService.CreateAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return BadRequest(response.DescriptionError);
        }

        [HttpPost, Route("login")]
        public async Task<ActionResult> LoginAsync(LoginViewModel model)
        {
            var response = await _authService.GetUserAsync(model);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                var jwt = _jwtService.Generate(model.Login);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                });

                return Ok(new { message = "success" });
            }

            return BadRequest(response.DescriptionError);
        }

        [HttpGet, Route("user")]
        public async Task<ActionResult<User>> GetUserAsync()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            string userLogin = token.Issuer;

            var response = await _authService.GetByLoginAsync(userLogin);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                return Ok(response.Data);

            return Unauthorized(response.DescriptionError);
        }

        [HttpPost, Route("logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions
            {
                HttpOnly = true,
            });

            return Ok(new { message = "success" });
        }
    }
}
