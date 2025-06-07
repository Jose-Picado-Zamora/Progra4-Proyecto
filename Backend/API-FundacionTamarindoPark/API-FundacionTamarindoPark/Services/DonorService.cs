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
        Task<Donor> Update(Donor donor);
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

        public async Task<Donor> Update(Donor donor)
        {
            var donorsForChanges = await _donorContext.Donors.SingleAsync(x => x.Id == donor.Id);
            donorsForChanges.Name = donor.Name;
            donorsForChanges.Email = donor.Email;
            donorsForChanges.Phone = donor.Phone;
            donorsForChanges.DonationType = donor.DonationType;
            donorsForChanges.Details = donor.Details;

            _donorContext.Donors.Update(donorsForChanges);
            await _donorContext.SaveChangesAsync();
            return donor;
        }
    }
}
