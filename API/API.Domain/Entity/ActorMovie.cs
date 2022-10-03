using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Domain.Entity
{
    public class ActorMovie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int ConnectionId { get; set; }
        [Required]
        public int ActorId { get; set; }
        [Required]
        public int MovieId { get; set; }
        public Actor Actor { get; set; }
        public Movie Movie { get; set; }


    }
}
