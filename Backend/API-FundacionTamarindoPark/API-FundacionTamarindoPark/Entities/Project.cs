using System.ComponentModel.DataAnnotations;


namespace API_FundacionTamarindoPark.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Application { get; set; }

    }
}