using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Domain.Entity
{
    public class GenreMovie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int ConnectionId { get; set; }
        [Required]
        public int GenreId { get; set; }
        [Required]
        public int MovieId { get; set; }
        public Genre Genre { get; set; }
        public Movie Movie { get; set; }


    }
}
