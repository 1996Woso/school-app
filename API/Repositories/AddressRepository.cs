using System;
using API.Data;
using API.Interfaces;
using API.Models;
using API.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class AddressRepository(DataContext dataContext) : IAddressRepository
{
    public async Task<Address> AddAsync(AddressDTO addressDTO)
    {
        Address address = new Address
        {
            Street = addressDTO.Street,
            Suburb = addressDTO.Suburb,
            City = addressDTO.City,
            Province = addressDTO.PostalCode,
            PostalCode = addressDTO.PostalCode,
            Country = addressDTO.Country
        };
        await dataContext.Addresses.AddAsync(address);
        await dataContext.SaveChangesAsync();
        return address;
    }

    public async Task<Address?> ExistingStudentAddressAsync(StudentDTO studentDTO)
    {
        return await dataContext.Addresses.FirstOrDefaultAsync(x =>
            x.Street == studentDTO.AddressDTO.Street &&
            x.Suburb == studentDTO.AddressDTO.Suburb &&
            x.City == studentDTO.AddressDTO.City &&
            x.Province == studentDTO.AddressDTO.Province &&
            x.Country == studentDTO.AddressDTO.Country &&
            x.PostalCode == studentDTO.AddressDTO.PostalCode);
    }
    public async Task<Address?> ExistingGuardianAddressAsync(GuardianDTO guardianDTO)
    {
        return await dataContext.Addresses.FirstOrDefaultAsync(x =>
            x.Street == guardianDTO.AddressDTO.Street &&
            x.Suburb == guardianDTO.AddressDTO.Suburb &&
            x.City == guardianDTO.AddressDTO.City &&
            x.Province == guardianDTO.AddressDTO.Province &&
            x.Country == guardianDTO.AddressDTO.Country &&
            x.PostalCode == guardianDTO.AddressDTO.PostalCode);
    }
}
