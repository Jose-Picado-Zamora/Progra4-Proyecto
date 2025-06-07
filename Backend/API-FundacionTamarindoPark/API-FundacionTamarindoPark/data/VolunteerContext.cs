using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using API_FundacionTamarindoPark.DTO;

namespace ProjectService.WebAPI.Data
{
    public class VolunteerContext : DbContext
    {
        public VolunteerContext(DbContextOptions<VolunteerContext> options) : base(options) { }

        public DbSet<Volunteer> Volunteers { get; set; }
    }
}