using System.IdentityModel.Tokens.Jwt;

namespace API.Service.Interfaces
{
    public interface IJwtService
    {
        string Generate(string login);
        JwtSecurityToken Verify(string jwt);
    }
}
