using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace API.Domain.Entity.Configuration
{
    public class MovieGenreConfiguration : IEntityTypeConfiguration<MovieGenre>
    {
        public void Configure(EntityTypeBuilder<MovieGenre> builder)
        {
            builder.HasKey(m => new {m.IdMovie, m.IdGenre });

            builder.HasOne(mg => mg.Movie)
                .WithMany(m => m.MovieGenre)
                .HasForeignKey(mg => mg.IdMovie);

            builder.HasOne(gm => gm.Genre)
                .WithMany(g => g.MovieGenre)
                .HasForeignKey(gm => gm.IdGenre);
        }
    }
}
