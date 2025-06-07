using Newtonsoft.Json;

namespace API_FundacionTamarindoPark.DTO
{
    public class Entrepreneur
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BusinessName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string FeriaName { get; set; }
        public string StandNumber { get; set; }
        public string ProductsDescription { get; set; }
    }
}