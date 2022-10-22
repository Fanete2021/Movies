using System.Collections.Generic;

namespace API.Domain.ViewModels
{
    public class FilterMoviesModel
    {
        public string Title { get; set; } = "";
        public List<int> ActorIds { get; set; } = new List<int>();
        public List<int> GenreIds { get; set; } = new List<int>();
        public int Limit { get; set; } = 100;
        public int Page { get; set; } = 1;
        public int MinPremiereYear { get; set; } = 1895;
        public int MaxPremiereYear { get; set; } = 2030;
    }
}
