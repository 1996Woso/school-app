using System;
using API.Data;
using API.Interfaces;
using API.Models;
using API.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class GuardianRepository(DataContext dataContext, IAddressRepository addressRepository) : IGuardianRepository
{
    public async Task<Guardian> AddAsync(GuardianDTO guardianDTO)
    {
        var guadianAddress = await addressRepository.ExistingGuardianAddressAsync(guardianDTO);
        guadianAddress ??= await addressRepository.AddAsync(guardianDTO.AddressDTO);
        Guardian guardian = new()
        {
            FirstName = guardianDTO.FirstName,
            SecondName = guardianDTO.SecondName,
            LastName = guardianDTO.LastName,
            DateOfBirth = guardianDTO.DateOfBirth,
            IdentityNumber = guardianDTO.IdentityNumber,
            Gender = guardianDTO.Gender,
            Relationship = guardianDTO.Relationship,
            Phone = guardianDTO.Phone,
            Email = guardianDTO.Phone,
            AddressId = guadianAddress.Id,
            Address = guadianAddress

        };
        await dataContext.Guardians.AddAsync(guardian);
        await dataContext.SaveChangesAsync();
        return guardian;
    }

    public async Task<Guardian?> FindByIdNoAsync(string IdentityNumber)
    {
        return await dataContext.Guardians
            .Include(g => g.Address)
            .FirstOrDefaultAsync(g => g.IdentityNumber == IdentityNumber);
    }
}
