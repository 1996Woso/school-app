using System;
using API.Models;
using API.Models.DTOs;
using API.Models.Pagination;

namespace API.Interfaces;

public interface IStudentRepository
{
    Task<Student?> GetByIdAsync(int Id);
    Task<Student?> GetByIdNoAsync(string IdentityNumber);
    Task<Student?> RegisterAsync(StudentRegistrationDTO studentRegistration);
    Task<PagedList<Student>> GetAllAsync(StudentParams studentParams);
}
