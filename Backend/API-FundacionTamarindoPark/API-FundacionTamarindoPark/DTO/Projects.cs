using Newtonsoft.Json;



namespace API_FundacionTamarindoPark.DTO
{
    public class Project
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("aplication")]
        public string Application { get; set; }
    }

}