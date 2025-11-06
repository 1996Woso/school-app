using System;
using API.Data;
using API.Interfaces;
using API.Models;
using API.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class StudentRepository(DataContext dataContext, IAddressRepository addressRepository
, IGuardianRepository guardianRepository) : IStudentRepository
{
    public async Task<List<Student>> GetAllAsync()
    {
        return await dataContext.Students
            .Include(s => s.Guardian)
            .Include(s => s.Address)
            .ToListAsync();
    }

    public async Task<Student?> GetByIdAsync(int Id)
    {
        return await dataContext.Students
            .Include(s => s.Guardian)
            .Include(s => s.Address)
            .FirstOrDefaultAsync(s => s.Id == Id);
    }
    public async Task<Student?> GetByIdNoAsync(string IdentityNumber)
    {
        return await dataContext.Students
            .Include(s => s.Guardian)
            .Include(s => s.Address)
            .FirstOrDefaultAsync(s => s.IdentityNumber == IdentityNumber);
    }
    public async Task<Student?> RegisterAsync(StudentRegistrationDTO studentRegistration)
    {
        /*
        **Check if Student Address already exists
        **If it does, using the existing Address
        **If not, add new Address
        */
        var studentAddress = await addressRepository.ExistingStudentAddressAsync(studentRegistration.Student);
        studentAddress ??= await addressRepository.AddAsync(studentRegistration.Student.AddressDTO);
        /*
        **Check if guardian already exists
        **If it does, using the existing Guaridan
        **If not, add new Guardian
        */
        var studentGuadian = await guardianRepository.FindByIdNoAsync(studentRegistration.Guardian.IdentityNumber);
        studentGuadian ??= await guardianRepository.AddAsync(studentRegistration.Guardian);
        //Create new student
        var student = new Student
        {
            FirstName = studentRegistration.Student.FirstName,
            SecondName = studentRegistration.Student.SecondName,
            LastName = studentRegistration.Student.LastName,
            IdentityNumber = studentRegistration.Student.IdentityNumber,
            Gender = studentRegistration.Student.Gender,
            Phone = studentRegistration.Student.Phone,
            Email = studentRegistration.Student.Email,
            DateOfBirth = studentRegistration.Student.DateOfBirth,
            AddressId = studentAddress.Id,
            GuardianId = studentGuadian.Id,
            Address = studentAddress,
            Guardian = studentGuadian
        };
        await dataContext.Students.AddAsync(student);
        await dataContext.SaveChangesAsync();
        //New student
        return await GetByIdNoAsync(studentRegistration.Student.IdentityNumber);
    }
}
