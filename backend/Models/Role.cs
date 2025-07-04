using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<User> Users { get; set; } = new List<User>();
    }
}