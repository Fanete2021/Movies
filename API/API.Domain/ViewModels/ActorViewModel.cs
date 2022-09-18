using API.Domain.Entity;
using System.Collections.Generic;

namespace API.Domain.ViewModels
{
    public class ActorViewModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<Movie> Movies { get; set; } = new List<Movie>();
    }
}
