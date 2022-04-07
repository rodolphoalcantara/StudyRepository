using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Mapping
{
    //Realiza o mapeamento da entidade para o banco de dados, passando todas as informações
    internal class UserMap : IEntityTypeConfiguration<UserEntity>
    {
        //Metodo que configura no banco de dados as propriedades da tabela User e pode ser executado em qlqr banco de dados
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("User");

            builder.HasKey( p => p.Id );

            builder.HasIndex( p => p.Email )
                   .IsUnique();

            builder.Property(u => u.Name)
                   .IsRequired()
                   .HasMaxLength(60);

            builder.Property(u => u.Email )
                   .HasMaxLength(100);

        }
    }
}
