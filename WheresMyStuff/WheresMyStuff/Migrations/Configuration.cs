namespace WheresMyStuff.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Security.Claims;
    internal sealed class Configuration : DbMigrationsConfiguration<WheresMyStuff.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WheresMyStuff.Models.ApplicationDbContext context)
        {
            #region Seed AspNetUsers

            //Set a new userStore variable
            var userStore = new UserStore<ApplicationUser>(context);
            //Set a new instance of the ApplicationUserManager class
            var userManager = new ApplicationUserManager(userStore);

            //CREATE new users
            //Check if the user exists
            var user = userManager.FindByName("deborahtwestwood@gmail.com");

            //create user if user does not already exist
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = "deborahtwestwood@gmail.com",
                    Email = "deborahtwestwood@gmail.com"
                };
                //use ApplicationUserManager to create the user in the db
                userManager.Create(user, "Password123!");
                //Add Claim for the user
                userManager.AddClaim(user.Id, new Claim("Admin", "true"));
            }

            var user2 = userManager.FindByName("barack.obama@gmail.com");
            if (user2 == null)
            {
                user2 = new ApplicationUser
                {
                    UserName = "barack.obama@gmail.com",
                    Email = "barack.obama@gmail.com"
                };
                userManager.Create(user2, "Password123!");
                userManager.AddClaim(user2.Id, new Claim("User", "true"));
            }

            #endregion

            #region Seed profiles
            var profiles = new ProfileModels[] {
                new ProfileModels
                {
                     Street = "5000 Forbes Ave",
                     City = "Pittsburgh",
                     State = "PA",
                     Zip = "15213",
                     DestinationStreet = "1700 N. Desert Drive",
                     DestinationCity = "Phoenix",
                     DestinationState = "AZ",
                     DestinationZip = "85281",
                     Fullname = "Debbie Westwood",
                     Phone = "602-123-4567",
                     UserId = user.Id,
                     isActive = true
                },
                new ProfileModels
                {
                     Street = "1600 Pennsylvania Ave NW",
                     City = "Washington",
                     State = "DC",
                     Zip = "20500",
                     DestinationStreet = "540 N Michigan Ave",
                     DestinationCity = "Chicago",
                     DestinationState = "IL",
                     DestinationZip = "60611",
                     Fullname = "Barack Obama",
                     Phone = "312-555-1234",
                     UserId = user2.Id,
                     isActive = true
                }

            };
            context.Profiles.AddOrUpdate(profiles);

            #endregion

            #region Seed items
            var items = new ItemsModels[] {
                new ItemsModels {
                //UserId = user.Id,
                ProfileModelsId = 1,
                ItemName = "Clock",
                ItemDesc = "Antique grandfather clock",
                ItemLocation = "Storage",
                ItemLabel = "Crate 01",
                ItemOwner = "Debbie Westwood",
                //AuthUsersModelsId = 1,
                ItemPhoto = "",
                isActive = true
                },
                new ItemsModels
                {
                //UserId = user.Id,
                ProfileModelsId = 1,
                ItemName = "Garden tools",
                ItemDesc = "Small hand tools for gardening",
                ItemLocation = "Home - Garage",
                ItemLabel = "Box 02",
                ItemOwner = "Steve Treible",
                //AuthUsersModelsId = 2,
                ItemPhoto = "",
                isActive = true
                },
                new ItemsModels
                {
                //UserId = user2.Id,
                ProfileModelsId = 2,
                ItemName = "Portrait",
                ItemDesc = "Official Presidential Portrait",
                ItemLocation = "Home - Garage",
                ItemLabel = "Box 05",
                ItemOwner = "Barack Obama",
                //AuthUsersModelsId = 2,
                ItemPhoto = "",
                isActive = true
                },
                new ItemsModels
                {
                //UserId = user2.Id,
                ProfileModelsId = 2,
                ItemName = "Silverware",
                ItemDesc = "Full set of silverware - gift from Joe",
                ItemLocation = "Home - Living ROom",
                ItemLabel = "Box 21",
                ItemOwner = "Michelle Obama",
                //AuthUsersModelsId = 2,
                ItemPhoto = "",
                isActive = true
                }
            };
            context.Items.AddOrUpdate(items);

            #endregion


            //var authUsers = new AuthUsersModels[] {
            //    new AuthUsersModels {

            //    },
            //    new AuthUsersModels {

            //    }
            //};
            //add or update seed items to database
        }
    }
}
