using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using API_FundacionTamarindoPark.DTO;

namespace ProjectService.WebAPI.Data
{
    public class DonorContext : DbContext
    {
        public DonorContext(DbContextOptions<DonorContext> options) : base(options) { }

        public DbSet<Donor> Donors { get; set; }

    }


}