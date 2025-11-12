using System;

namespace API.Models.Pagination;

public class StudentParams: PaginationParams
{
    public string? Gender { get; set; }
    public string? Name { get; set; }
    public int MinAge { get; set; } = 3;
    public int MaxAge { get; set; } = 100;
}
