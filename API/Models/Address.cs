using System;
using System.Text.Json.Serialization;

namespace API.Models;

public class Address
{
    public int Id { get; set; }
    public required string Street { get; set; }
    public required string Suburb { get; set; }
    public required string City { get; set; }
    public  string? Province { get; set; }
    public required string Country { get; set; }
    public required string PostalCode { get; set; }

    //Navigation
    [JsonIgnore]//stop JSON serialization from recursing endlessly.
    public ICollection<Student> Students { get; set; } = [];
    [JsonIgnore]
    public ICollection<Guardian> Guardians  { get; set; } = [];
}
