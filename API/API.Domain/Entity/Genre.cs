using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Domain.Entity
{
    public class Genre
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }
        [Required, MaxLength(16)]
        public string Title { get; set; }

        [JsonIgnore]
        public List<Movie> Movies { get; set; } = new List<Movie>();
    }
}
