using System;
using API.Models;
using API.Models.DTOs;

namespace API.Interfaces;

public interface IGuardianRepository
{
    Task<Guardian?> FindByIdNoAsync(string IdentityNumber);
    Task<Guardian> AddAsync(GuardianDTO guardianDTO);
}
