using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using API_FundacionTamarindoPark.DTO;
using API_FundacionTamarindoPark.Services;

namespace ProjectService.WebAPI.Controllers
{
    [Route("api/fairs")]
    [ApiController]
    public class FairsController : ControllerBase
    {
        private readonly IFairService _fairService;

        public FairsController(IFairService fairService)
        {
            _fairService = fairService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var fairs = await _fairService.Get(null);
            return Ok(fairs);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] Fair fair)
        {
            if (fair == null)
            {
                return BadRequest("Invalid fair data.");
            }

            try
            {
                var createdFair = await _fairService.Add(fair);
                return Ok(createdFair);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] Fair fair)
        {
            if (fair == null || fair.id != id)
                return BadRequest("ID mismatch or fair is null.");

            var updatedFair = await _fairService.Update(fair);
            if (updatedFair == null)
                return NotFound();

            return Ok(updatedFair);
        }
    }
}