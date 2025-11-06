using System;
using API.Models;
using API.Models.DTOs;

namespace API.Interfaces;

public interface IAddressRepository
{
    Task<Address?> ExistingStudentAddressAsync(StudentDTO studentDTO);
     Task<Address?> ExistingGuardianAddressAsync(GuardianDTO guardianDTO);
    Task<Address> AddAsync(AddressDTO addressDTO);
}
