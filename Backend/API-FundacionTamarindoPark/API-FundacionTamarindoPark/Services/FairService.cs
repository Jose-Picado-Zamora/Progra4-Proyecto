using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Services
{
    public interface IFairService
    {
        Task<IEnumerable<Fair>> Get(int[] ids);
        Task<Fair> Add(Fair fair);
        Task<Fair> Update(Fair fair);
    }

    public class FairService : IFairService
    {
        private readonly FairContext _context;

        public FairService(FairContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Fair>> Get(int[] ids)
        {
            var query = _context.Fairs.AsQueryable();
            if (ids != null && ids.Any())
                query = query.Where(f => ids.Contains(f.id));

            return await query.ToListAsync();
        }

        public async Task<Fair> Add(Fair fair)
        {
            await _context.Fairs.AddAsync(fair);
            await _context.SaveChangesAsync();
            return fair;
        }

        public async Task<Fair> Update(Fair fair)
        {
            var existing = await _context.Fairs.FindAsync(fair.id);
            if (existing == null) return null;

            existing.name = fair.name;
            existing.description = fair.description;
            existing.location = fair.location;
            existing.date = fair.date;

            await _context.SaveChangesAsync();
            return existing;
        }
    }
}