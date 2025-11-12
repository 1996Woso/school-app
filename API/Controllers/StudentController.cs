
using API.Extensions;
using API.Interfaces;
using API.Models;
using API.Models.DTOs;
using API.Models.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StudentController(IStudentRepository studentRepository) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] StudentRegistrationDTO studentRegistration)
        {
            var existingStudent = await studentRepository.GetByIdNoAsync(studentRegistration.Student.IdentityNumber);
            if (existingStudent != null) return BadRequest($"Student with Id No '{studentRegistration.Student.IdentityNumber}' already exists");
            await studentRepository.RegisterAsync(studentRegistration);
            var newStudent = await studentRepository.GetByIdNoAsync(studentRegistration.Student.IdentityNumber);
            if (newStudent == null) return NotFound("Failed to fetch new student's information");
            return Ok(newStudent);

        }
        [HttpGet]
        public async Task<IActionResult> Students([FromQuery] StudentParams studentParams)
        {
            var students = await studentRepository.GetAllAsync(studentParams);
            // if (students.Count == 0) return NotFound("No users not found.");
            Response.AddPaginationHeader(students);
            return Ok(students);
        }
    }
}

