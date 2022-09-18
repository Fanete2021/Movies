using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Domain.Entity
{
    public class Movie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PremiereYear { get; set; }

        public List<Actor> Actors { get; set; } = new List<Actor>();
        public List<Genre> Genres { get; set; } = new List<Genre>();
    }
}
