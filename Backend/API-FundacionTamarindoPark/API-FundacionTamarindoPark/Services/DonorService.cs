using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Services
{
    public interface IDonorService
    {
        Task<IEnumerable<Donor>> Get(int[] ids);
        Task<Donor> Add(Donor donor);
    }

    public class DonorService : IDonorService
    {
        private readonly DonorContext _donorContext;

        public DonorService(DonorContext donorContext)
        {
            _donorContext = donorContext;
        }

        public async Task<IEnumerable<Donor>> Get(int[] ids)
        {
            var donors = _donorContext.Donors.AsQueryable();

            if (ids != null && ids.Any())
                donors = donors.Where(d => ids.Contains(d.Id));

            return await donors.ToListAsync();
        }

        public async Task<API_FundacionTamarindoPark.DTO.Donor> Add(Donor donor)
        {
            await _donorContext.Donors.AddAsync(donor);
            await _donorContext.SaveChangesAsync();
            return donor;
        }
    }
}
