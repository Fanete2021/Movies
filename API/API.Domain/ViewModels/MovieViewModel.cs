using API.Domain.Entity;
using System.Collections.Generic;

namespace API.Domain.ViewModels
{
    public class MovieViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int PremiereYear { get; set; }
        public List<Actor> Actors { get; set; } = new List<Actor>();
        public List<Genre> Genres { get; set; } = new List<Genre>();
    }
}
