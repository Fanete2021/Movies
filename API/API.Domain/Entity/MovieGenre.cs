using System;
using System.Collections.Generic;
using System.Text;

namespace API.Domain.Entity
{
    public class MovieGenre
    {
        public int IdMovie { get; set; }
        public Movie Movie { get; set; }

        public int IdGenre { get; set; }
        public Genre Genre { get; set; }
    }
}
