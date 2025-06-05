using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Entities;



namespace  API_FundacionTamarindoPark.Services;

public interface IProjectsService
{
    Task<IEnumerable<Project>> Get(int[] ids);
    Task<Project> Add(Project project);
}
public class ProjectService : IProjectsService
    {
        private readonly ProjectContext _projectContext;

        public ProjectService(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }


        public async Task<IEnumerable<Project>> Get(int[] ids)
        {
        var projects  = _projectContext.Projects.AsQueryable();

            if (ids != null && ids.Any())
                projects = projects.Where(x => ids.Contains(x.Id));

            return await projects.ToListAsync();
        }

        public async Task<API_FundacionTamarindoPark.Entities.Project> Add(Project project)
        {
            await _projectContext.Projects.AddAsync(project);

            await _projectContext.SaveChangesAsync();
            return project;
        }
    }

  



