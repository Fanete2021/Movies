using Microsoft.EntityFrameworkCore;
using API.Domain.Entity;

namespace API.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Filling in genres during migration
            modelBuilder.Entity<Genre>()
                .HasData(
                    new Genre { Id = 1, Title = "Drama" },
                    new Genre { Id = 2, Title = "Comedy" },
                    new Genre { Id = 3, Title = "Musical" },
                    new Genre { Id = 4, Title = "Romance" },
                    new Genre { Id = 5, Title = "Adventure" },
                    new Genre { Id = 6, Title = "Crime" },
                    new Genre { Id = 7, Title = "Action" },
                    new Genre { Id = 8, Title = "Thriller" },
                    new Genre { Id = 9, Title = "Horror" }
                );

            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Genres)
                .WithMany(g => g.Movies)
                .UsingEntity<GenreMovie>(
                    mg => mg.HasOne(prop => prop.Genre).WithMany().HasForeignKey(prop => prop.GenreId),
                    mg => mg.HasOne(prop => prop.Movie).WithMany().HasForeignKey(prop => prop.MovieId),
                    mg =>
                    {
                        mg.HasKey(prop => prop.ConnectionId);
                        mg.Property(prop => prop.ConnectionId).ValueGeneratedOnAdd();
                    }
                );

            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Actors)
                .WithMany(a => a.Movies)
                .UsingEntity<ActorMovie>(
                    ma => ma.HasOne(prop => prop.Actor).WithMany().HasForeignKey(prop => prop.ActorId),
                    ma => ma.HasOne(prop => prop.Movie).WithMany().HasForeignKey(prop => prop.MovieId),
                    ma =>
                    {
                        ma.HasKey(prop => prop.ConnectionId);
                        ma.Property(prop => prop.ConnectionId).ValueGeneratedOnAdd();
                    }
                );
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<ActorMovie> ActorMovie { get; set; }
        public DbSet<GenreMovie> GenreMovie { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
