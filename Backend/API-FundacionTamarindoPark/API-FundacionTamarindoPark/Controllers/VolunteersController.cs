using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Services;
using API_FundacionTamarindoPark.DTO;
using Microsoft.AspNetCore.Authorization;

namespace ProjectService.WebAPI.Controllers
{
    [Route("api/volunteers")]
    [ApiController]
    public class VolunteersController : ControllerBase
    {
        private readonly IVolunteerService _volunteerService;

        public VolunteersController(IVolunteerService volunteerService)
        {
            _volunteerService = volunteerService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var volunteers = await _volunteerService.Get(null);
            return Ok(volunteers);
        }

        [HttpGet("{volunteerId}")]
        [Authorize]
        public async Task<IActionResult> GetById(int volunteerId)
        {
            var volunteer = (await _volunteerService.Get(new[] { volunteerId })).FirstOrDefault();
            if (volunteer == null)
                return NotFound();

            return Ok(volunteer);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(Volunteer volunteer)
        {
            await _volunteerService.Add(volunteer);
            return Ok(volunteer);
        }

        [HttpPut("{volunteerId}")]
        [Authorize]
        public async Task<IActionResult> Update(int volunteerId, Volunteer volunteer)
        {
            var existingVolunteer = (await _volunteerService.Get(new[] { volunteerId })).FirstOrDefault();
            if (existingVolunteer == null)
                return NotFound();

            volunteer.Id = volunteerId;

            await _volunteerService.Update(volunteer);
            return Ok(volunteer);
        }

        [HttpDelete("{volunteerId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int volunteerId)
        {
            var result = await _volunteerService.Delete(volunteerId);
            if (!result)
                return NotFound();

            return Ok(new { message = "Volunteer deleted successfully" });
        }
    }
}