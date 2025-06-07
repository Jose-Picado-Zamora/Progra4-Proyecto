using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Services
{
    public interface IEntrepreneurService
    {
        Task<IEnumerable<Entrepreneur>> Get(int[] ids);
        Task<Entrepreneur> Add(Entrepreneur entrepreneur);
        Task<Entrepreneur> Update(Entrepreneur entrepreneur);
    }

    public class EntrepreneurService : IEntrepreneurService
    {
        private readonly EntrepreneurContext _entrepreneurContext;

        public EntrepreneurService(EntrepreneurContext entrepreneurContext)
        {
            _entrepreneurContext = entrepreneurContext;
        }

        public async Task<IEnumerable<Entrepreneur>> Get(int[] ids)
        {
            var entrepreneurs = _entrepreneurContext.Entrepreneurs.AsQueryable();

            if (ids != null && ids.Any())
                entrepreneurs = entrepreneurs.Where(e => ids.Contains(e.Id));

            return await entrepreneurs.ToListAsync();
        }

        public async Task<Entrepreneur> Add(Entrepreneur entrepreneur)
        {
            await _entrepreneurContext.Entrepreneurs.AddAsync(entrepreneur);
            await _entrepreneurContext.SaveChangesAsync();
            return entrepreneur;
        }

        public async Task<Entrepreneur> Update(Entrepreneur entrepreneur)
        {
            var entrepreneurForChanges = await _entrepreneurContext.Entrepreneurs.SingleAsync(x => x.Id == entrepreneur.Id);
            entrepreneurForChanges.Name = entrepreneur.Name;
            entrepreneurForChanges.BusinessName = entrepreneur.BusinessName;
            entrepreneurForChanges.Phone = entrepreneur.Phone;
            entrepreneurForChanges.Email = entrepreneur.Email;
            entrepreneurForChanges.FeriaName = entrepreneur.FeriaName;
            entrepreneurForChanges.StandNumber = entrepreneur.StandNumber;
            entrepreneurForChanges.ProductsDescription = entrepreneur.ProductsDescription;

            _entrepreneurContext.Entrepreneurs.Update(entrepreneurForChanges);
            await _entrepreneurContext.SaveChangesAsync();
            return entrepreneur;
        }


    }
}