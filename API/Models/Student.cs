using System;

namespace API.Models;

public class Student
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public string? SecondName { get; set; }
    public required string LastName { get; set; }
    public required string Gender { get; set; }
    public required string IdentityNumber { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public required DateOnly DateOfBirth { get; set; }
    //Address
    public int AddressId { get; set; }
    public required Address Address { get; set; }
    //Guadian
    public int GuardianId { get; set; }
    public required Guardian Guardian { get; set; }
}
