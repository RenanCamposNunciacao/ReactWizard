using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactWizard.Core.Model;
using System;

namespace ReactWizard.Core._Base
{
    public class BaseContext : DbContext
    {
        public DbSet<UserModel> User { get; set; }

        public DbSet<UserAddressModel> UserAddress { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
                
            if (string.IsNullOrEmpty(configuration.GetConnectionString("ReactWizard")))
                throw new Exception("Not able to find a connection string named ReactWizard");

            optionsBuilder.UseMySQL(configuration.GetConnectionString("ReactWizard"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserModel>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<UserAddressModel>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Street).IsRequired();
                entity.Property(e => e.Number).IsRequired();
                entity.HasOne(d => d.User)
                    .WithMany(p => p.Addresses);
            });
        }
    }
}
