using CareerCrafterAPI.Models;

using Microsoft.EntityFrameworkCore;

namespace CareerCrafterAPI.Data
{
    public class CareerCrafterDbContext : DbContext
    {
        public CareerCrafterDbContext(DbContextOptions<CareerCrafterDbContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Employer> Employers { get; set; } = null!;
        public DbSet<Job> Jobs { get; set; } = null!;
        public DbSet<JobSeeker> JobSeekers { get; set; } = null!;
        public DbSet<Application> Applications { get; set; }=null!;
        public DbSet<Resume> Resumes { get; set; } = null!;
        public DbSet<Notification> Notifications { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Job)
                .WithMany(j => j.Applications)
                .HasForeignKey(a => a.JobId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Job>()
                 .Property(j => j.Salary)
                 .HasPrecision(18, 2);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.JobSeeker)
                .WithMany()
                .HasForeignKey(n => n.JobSeekerId);


            //modelBuilder.Entity<Resume>()
            //    .HasIndex(r => r.JobSeekerId)
            //    .IsUnique();
            //modelBuilder.Entity<User>()
            //    .HasIndex(u => u.Email)
            //    .IsUnique();


            base.OnModelCreating(modelBuilder);

         

            modelBuilder.Entity<Application>()
                .HasOne(a => a.Resume)
                .WithMany(r => r.Applications)
                .HasForeignKey(a => a.ResumeId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
