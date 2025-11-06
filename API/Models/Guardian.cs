using System;
using System.Text.Json.Serialization;

namespace API.Models;

public class Guardian
{
   public int Id { get; set; }
   public required string FirstName { get; set; }
   public string? SecondName { get; set; }
   public required string LastName { get; set; }
   public required string Gender { get; set; }
   public required string Relationship { get; set; }
   public required string IdentityNumber { get; set; }
   public string? Email { get; set; }
   public required string Phone { get; set; }
   public required DateOnly DateOfBirth { get; set; }
   //Address
   public int AddressId { get; set; }
   public required Address Address { get; set; }
   //Students (one-to-many)
   [JsonIgnore]//stop JSON serialization from recursing endlessly.
   public ICollection<Student> Students { get; set; } = [];
}
