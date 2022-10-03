using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Domain.Entity
{
    public class User
    {
        [Key, Required, MaxLength(16)]
        public string Login { get; set; }
        [Required, JsonIgnore]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
