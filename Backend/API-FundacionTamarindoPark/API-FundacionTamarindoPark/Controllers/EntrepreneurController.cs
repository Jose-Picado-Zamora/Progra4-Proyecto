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
    [Route("api/entrepreneurs")]
    [ApiController]
    public class EntrepreneurController : ControllerBase
    {
        private readonly IEntrepreneurService _entrepreneurService;

        public EntrepreneurController(IEntrepreneurService entrepreneurService)
        {
            _entrepreneurService = entrepreneurService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var entrepreneurs = await _entrepreneurService.Get(null);
            return Ok(entrepreneurs);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(Entrepreneur entrepreneur)
        {
            await _entrepreneurService.Add(entrepreneur);
            return Ok(entrepreneur);
        }

        [HttpPut("{entrepreneurId}")]
        [Authorize]
        public async Task<IActionResult> Update(int entrepreneurId, Entrepreneur entrepreneur)
        {
            var existingEntrepreneur = (await _entrepreneurService.Get(new[] { entrepreneurId })).FirstOrDefault();
            if (existingEntrepreneur == null)
                return NotFound();

            entrepreneur.Id = entrepreneurId;

            await _entrepreneurService.Update(entrepreneur);
            return Ok(entrepreneur);
        }
    }
}