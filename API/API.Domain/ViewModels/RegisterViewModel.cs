using System.ComponentModel.DataAnnotations;

namespace API.Domain.ViewModels
{
    public class RegisterViewModel
    {
        [Required, RegularExpression(@"[0-9A-Za-z]{1,16}", ErrorMessage = "RegexNotMatch")]
        public string Login { get; set; }

        [Required, RegularExpression(@"[0-9A-Za-z]{1,20}", ErrorMessage = "RegexNotMatch")]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
