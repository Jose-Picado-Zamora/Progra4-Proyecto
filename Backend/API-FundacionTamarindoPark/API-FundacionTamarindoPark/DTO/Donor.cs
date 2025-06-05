using Newtonsoft.Json;
namespace API_FundacionTamarindoPark.DTO
{
    public class Donor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DonationType { get; set; }
        public string Details { get; set; }
    }
}
