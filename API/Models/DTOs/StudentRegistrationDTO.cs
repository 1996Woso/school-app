using System;

namespace API.Models.DTOs;

public class StudentRegistrationDTO
{
    public required StudentDTO Student { get; set; }
    public required GuardianDTO Guardian { get; set; }
    // public required AddressDTO Address { get; set; }
}
