using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.DTO;



namespace  API_FundacionTamarindoPark.Services;

public interface IProjectsService
{
    Task<IEnumerable<Project>> Get(int[] ids);
    Task<Project> Add(Project project);
    Task<Project> Update(Project project);
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

        public async Task<API_FundacionTamarindoPark.DTO.Project> Add(Project project)
        {
            await _projectContext.Projects.AddAsync(project);

            await _projectContext.SaveChangesAsync();
            return project;
        }

        public async Task<Project> Update(Project projects)
        {
            var projectForChanges = await _projectContext.Projects.SingleAsync(x => x.Id == projects.Id);
            projectForChanges.Name = projects.Name;
            projectForChanges.Email = projects.Email;
            projectForChanges.Location = projects.Location;
            projectForChanges.Application = projects.Application;

            _projectContext.Projects.Update(projectForChanges);
            await _projectContext.SaveChangesAsync();
            return projects;
        }
}

  



