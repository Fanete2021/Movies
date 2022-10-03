using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Domain.Entity
{
    public class Actor
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }
        [MaxLength(16)]
        public string Name { get; set; }
        [MaxLength(16)]
        public string Surname { get; set; }

        [JsonIgnore]
        public List<Movie> Movies { get; set; } = new List<Movie>();
    }
}
