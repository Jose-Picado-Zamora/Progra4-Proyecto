using Microsoft.EntityFrameworkCore;
using ProjectService.WebAPI.Data;
using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.DTO;

namespace API_FundacionTamarindoPark.Services
{
    public interface IVolunteerService
    {
        Task<IEnumerable<Volunteer>> Get(int[] ids);
        Task<Volunteer> Add(Volunteer volunteer);
        Task<Volunteer> Update(Volunteer volunteer);
        Task<bool> Delete(int id);
    }

    public class VolunteerService : IVolunteerService
    {
        private readonly VolunteerContext _volunteerContext;

        public VolunteerService(VolunteerContext volunteerContext)
        {
            _volunteerContext = volunteerContext;
        }

        public async Task<IEnumerable<Volunteer>> Get(int[] ids)
        {
            var volunteers = _volunteerContext.Volunteers.AsQueryable();

            if (ids != null && ids.Any())
                volunteers = volunteers.Where(v => ids.Contains(v.Id));

            return await volunteers.ToListAsync();
        }

        public async Task<Volunteer> Add(Volunteer volunteer)
        {
            await _volunteerContext.Volunteers.AddAsync(volunteer);
            await _volunteerContext.SaveChangesAsync();
            return volunteer;
        }

        public async Task<Volunteer> Update(Volunteer volunteer)
        {
            var volunteerForChanges = await _volunteerContext.Volunteers.SingleAsync(x => x.Id == volunteer.Id);
            volunteerForChanges.Name = volunteer.Name;
            volunteerForChanges.Phone = volunteer.Phone;
            volunteerForChanges.Email = volunteer.Email;
            volunteerForChanges.Address = volunteer.Address;
            volunteerForChanges.Rol = volunteer.Rol;
            volunteerForChanges.ProjectName = volunteer.ProjectName;

            _volunteerContext.Volunteers.Update(volunteerForChanges);
            await _volunteerContext.SaveChangesAsync();
            return volunteer;
        }

        public async Task<bool> Delete(int id)
        {
            var volunteer = await _volunteerContext.Volunteers.FindAsync(id);
            if (volunteer == null)
                return false;

            _volunteerContext.Volunteers.Remove(volunteer);
            await _volunteerContext.SaveChangesAsync();
            return true;
        }
    }
}