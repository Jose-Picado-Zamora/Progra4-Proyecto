using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Services;
using System;
using API_FundacionTamarindoPark.DTO;
using Microsoft.AspNetCore.Authorization;


namespace ProjectService.WebAPI.Controllers
{
    [Route("api/projects")]
    [ApiController]
    
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsService _projectsService;

        public ProjectsController(IProjectsService projectsService)
        {
            _projectsService = projectsService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _projectsService.Get(null);
            return Ok(projects);
        }
        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Add(Project p)
        {
            await _projectsService.Add(p);
            return Ok(p);
        }
        [HttpPut("{projectId}")]
        [Authorize]
        public async Task<IActionResult> Update(int projectId, Project project)
        {
            var existinProject = (await _projectsService.Get(new[] { projectId })).FirstOrDefault();
            if (existinProject == null)
                return NotFound();

            await _projectsService.Update(project);
            return Ok(project);
        }
    }

}


