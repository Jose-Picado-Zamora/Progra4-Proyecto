using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Services;

public interface IUserAuthService
{
    Task<User> AuthenticateAsync(string email, string password);
}

public class UserAuthService : IUserAuthService
{

    public async Task<User> AuthenticateAsync(string email, string password)
    {
        if (email == "admin" && password == "1234")
        {
            return new User() { Id = 1, Email = email, Password = password, Role = "admin" };
        }

        return null;
    }

}

