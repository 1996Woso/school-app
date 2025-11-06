using System;

namespace API.Models.DTOs;

public class AddressDTO
{
    public required string Street { get; set; }
    public required string Suburb { get; set; }
    public required string City { get; set; }
    public  string? Province { get; set; }
    public required string Country { get; set; }
    public required string PostalCode { get; set; }
}
