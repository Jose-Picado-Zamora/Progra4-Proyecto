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
    [Route("api/donors")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly IDonorService _donorService;

        public DonorsController(IDonorService donorService)
        {
            _donorService = donorService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var donors = await _donorService.Get(null);
            return Ok(donors);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(Donor donor)
        {
            await _donorService.Add(donor);
            return Ok(donor);
        }
    }
}
