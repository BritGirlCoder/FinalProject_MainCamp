//This file contains all the CRUD Services for both items and users

namespace WMS.Services {

    //CRUD class for users (profile view/controller)
    export class AccountProfileServices {
        //property to hold profiles $resource
        private ProfileResource;
        //Property to hold profiles by user $resource
        private ProfilesByUserResource;
        //Holds profiles associated with a user login
        public profiles;

        //constructor with $resource dependency injection
        constructor($resource: ng.resource.IResourceService) {
            this.ProfileResource = $resource("/api/AccountProfile/:id");
            this.ProfilesByUserResource = $resource("api/AccountProfile/getProfilesByUser/");
        }

        //Read All Profiles
        public listAccounts() {
            return this.ProfileResource.query();
        }

        //Create Profile
        public createAccountProfile(profile) {
            console.log("create profile");
            console.log("CRUDServices createProfile " + profile);
            return this.ProfileResource.save(profile).$promise;
        }

        //Save Profile
        public saveAccountProfile(profile) {
            return this.ProfileResource.save(profile).$promise;
        }

        //Fetch specific AccountProfile by id
        public getAccountProfile(id: number) {
            return this.ProfileResource.get({id: id});
        }

        //Fetch specific Profiles by Login UserID
        public getAccountProfileByUser() {
            this.profiles = this.ProfilesByUserResource.query();            
            return this.profiles;
            
        }

        //Delete AccountProfile
        public deleteAccountProfile(id: number) {
            return this.ProfileResource.delete({ id: id }).promise;
        }

    }


    export class ItemsServices {
        //property to hold items $resource
        private ItemResource;
        //property to hold accountprofile $resource
        private AccountResource;
        //property to hold items by user $resource
        private ItemByUserResource;
        //property to hold items by profile $resource
        private ItemByProfileResource;
        //property to hold items by search $resource
        private searchResource;
        //property to hold individual item
        private item;
        //Property to hold profiles
        //public profiles;
        //Property to hold selected profile
        //public selectedProfile

        //constructor with $resource dependency injection
        constructor($resource: ng.resource.IResourceService, private profileService: WMS.Services.AccountProfileServices)
        {            
            this.ItemResource = $resource("/api/ItemsModels/:id");
            this.ItemByUserResource = $resource("api/ItemsModels/DisplayByUser/");
            this.ItemByProfileResource = $resource("api/ItemsModels/DisplayByProfile/:id");

            this.AccountResource = $resource("/api/AccountProfile/:id");            
        }
               

        //Read Items for specific login
        public listItemsByUser() {            
            var items = this.ItemByUserResource.query();
            return items;            
        }

        //Read Items for specific profile
        public listItemsByProfile(profileId) {
            var items = this.ItemByProfileResource.query({id: profileId});
            return items;
        }

        //Read all Items for any login - restricted to admin users only on server side
        public listAllItems() {
            var items = this.ItemResource.query();
            return items;
        }

        //Create/Save item
        public SaveItem(item) {
            return this.ItemResource.save(item).promise;            
        }

        //Fetch specific item
        public getItem(id: number) {
            return this.ItemResource.get({id: id});
        }

        //Delete item
        public deleteItem(id: number) {
            return this.ItemResource.delete({ id: id }).promise;
        }
    }


    //CRUD class for tags (items - uses a JSON file)
    //Expand on this if I have time - mainly for testing
    export class TagsServices {

        //property to hold tags $resource
        private TagResource;

        //constructor with dependency injection
        constructor($resource: ng.resource.IResourceService) {
            this.TagResource = $resource("/characteristics.json");
        }

        //Read tags
        public readTags() {

            return this.TagResource.get();
        }

    }

    //registering the services
    angular.module("WMS").service("tagsService", TagsServices);
    angular.module("WMS").service("itemsService", ItemsServices);
    angular.module("WMS").service("profileService", AccountProfileServices);
}