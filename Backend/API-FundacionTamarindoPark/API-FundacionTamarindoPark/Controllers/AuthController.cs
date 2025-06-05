using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.Helpers;
using API_FundacionTamarindoPark.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Controllers;

public record TokenResponse(string token);

public record UserCredencial(string email, string password);

[ApiController]
public class AuthController : Controller
{
    private readonly IUserAuthService userAuthService;

    private readonly JwtSettings jwtSettings;

    public AuthController(IUserAuthService _userAuthService, JwtSettings _jwtSettings)
    {
        userAuthService = _userAuthService;
        jwtSettings = _jwtSettings;
    }

    [HttpPost("/login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserCredencial user)
    {
        var validuser = await userAuthService.AuthenticateAsync(user.email, user.password);
        if (validuser is null)
            return Unauthorized();


        var token = TokenGenerator.GenerateToken(validuser, jwtSettings);

        return Ok(new TokenResponse(token));
    }

}
