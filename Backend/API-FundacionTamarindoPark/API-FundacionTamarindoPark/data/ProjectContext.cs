using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using API_FundacionTamarindoPark.Entities;

namespace ProjectService.WebAPI.Data
{
    public class ProjectContext : DbContext
    {

        public ProjectContext
                (DbContextOptions<ProjectContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }

    }
 

}