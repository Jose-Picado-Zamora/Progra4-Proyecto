using Microsoft.EntityFrameworkCore;
using API_FundacionTamarindoPark.DTO;

namespace ProjectService.WebAPI.Data
{
    public class FairContext : DbContext
    {
        public FairContext(DbContextOptions<FairContext> options) : base(options) { }

        public DbSet<Fair> Fairs { get; set; }
    }
}
