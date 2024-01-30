using FundamentosDesenvolvedorIO.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FundamentosDesenvolvedorIO.Data
{
    public class ApiDbContext : IdentityDbContext // especialização do DbContext para poder conter as funcionalidades do Identity
    {
        public DbSet<Produto> Produtos { get; set; }
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
            
        }
    }
}
