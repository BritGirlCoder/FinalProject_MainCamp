namespace WheresMyStuff.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WheresMyStuff.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WheresMyStuff.Models.ApplicationDbContext context)
        {
            var items = new ItemsModels[] {
                new ItemsModels {
                ItemName = "Clock",
                ItemDesc = "Antique grandfather clock",
                ItemLocation = "Storage",
                ItemLabel = "Crate 01",
                ItemOwner = "Jane Doe",
                OwnerId = 1,
                ItemPhoto = ""
                },
                new ItemsModels
                {
                ItemName = "Garden tools",
                ItemDesc = "Small hand tools for gardening",
                ItemLocation = "Home - Garage",
                ItemLabel = "Box 02",
                ItemOwner = "John Doe",
                OwnerId = 2,
                ItemPhoto = ""
                }
            };
            //add or update seed items to database
            context.Items.AddOrUpdate(i => i.ItemName, items);
        }
    }
}
