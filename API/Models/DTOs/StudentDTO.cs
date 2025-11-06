using System;

namespace API.Models.DTOs;

public class StudentDTO
{
    public required string FirstName { get; set; }
    public string? SecondName { get; set; }
    public required string LastName { get; set; }
    public required string IdentityNumber { get; set; }
    public required string Gender { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public required DateOnly DateOfBirth { get; set; }
    public required AddressDTO AddressDTO { get; set; }
    // public required GuardianDTO GuardianDTO { get; set; }
}
