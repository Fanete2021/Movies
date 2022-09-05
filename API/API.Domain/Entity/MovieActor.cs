using System;
using System.Collections.Generic;
using System.Text;

namespace API.Domain.Entity
{
    public class MovieActor
    {
        public int IdMovie { get; set; }
        public Movie Movie { get; set; }

        public int IdActor { get; set; }
        public Actor Actor { get; set; }
    }
}
