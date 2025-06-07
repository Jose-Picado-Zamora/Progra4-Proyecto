using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using API_FundacionTamarindoPark.DTO;

namespace ProjectService.WebAPI.Data
{
    public class EntrepreneurContext : DbContext
    {
        public EntrepreneurContext(DbContextOptions<EntrepreneurContext> options) : base(options) { }

        public DbSet<Entrepreneur> Entrepreneurs { get; set; }
    }
}