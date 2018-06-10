using System.ComponentModel.DataAnnotations;

namespace AbpAlain.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}