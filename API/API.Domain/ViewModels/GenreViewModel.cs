using API.Domain.Entity;
using System.Collections.Generic;

namespace API.Domain.ViewModels
{
    public class GenreViewModel
    {
        public string Title { get; set; }
        public List<Movie> MovieGenre { get; set; } = new List<Movie>();
    }
}
