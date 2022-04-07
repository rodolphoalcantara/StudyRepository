using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace Data.Context
{
    public class ContextFactory : IDesignTimeDbContextFactory<MyContext>
    {
        public MyContext CreateDbContext(string[] args)
        {
            //provem a criacao/conexao do banco de dados em tempo de Design
            var connectionString = "Server=localhost;Port=3306;Database=dbEstudoDotNet;Uid=root;Pwd=root";
            //var connectionString = Environment.GetEnvironmentVariable("ConnectionStringEstudoDotNet");
            var optionsBuilder = new DbContextOptionsBuilder<MyContext>();
            optionsBuilder.UseMySql(connectionString);
            return new MyContext(optionsBuilder.Options);
        }
    }
}
