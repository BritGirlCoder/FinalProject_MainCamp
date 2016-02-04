//This file contains all the CRUD Services for both items and users
var WMS;
(function (WMS) {
    var Services;
    (function (Services) {
        //CRUD class for users (profile view/controller)
        var AccountProfileServices = (function () {
            //constructor with $resource dependency injection
            function AccountProfileServices($resource) {
                this.ProfileResource = $resource("/api/AccountProfile/:id");
                this.ProfilesByUserResource = $resource("api/AccountProfile/getProfilesByUser/");
            }
            //Read All Profiles
            AccountProfileServices.prototype.listAccounts = function () {
                return this.ProfileResource.query();
            };
            //Create Profile
            AccountProfileServices.prototype.createAccountProfile = function (profile) {
                console.log("create profile");
                console.log("CRUDServices createProfile " + profile);
                return this.ProfileResource.save(profile).$promise;
            };
            //Save Profile
            AccountProfileServices.prototype.saveAccountProfile = function (profile) {
                return this.ProfileResource.save(profile).$promise;
            };
            //Fetch specific AccountProfile by id
            AccountProfileServices.prototype.getAccountProfile = function (id) {
                return this.ProfileResource.get({ id: id });
            };
            //Fetch specific Profiles by Login UserID
            AccountProfileServices.prototype.getAccountProfileByUser = function () {
                this.profiles = this.ProfilesByUserResource.query();
                return this.profiles;
            };
            //Delete AccountProfile
            AccountProfileServices.prototype.deleteAccountProfile = function (id) {
                return this.ProfileResource.delete({ id: id }).promise;
            };
            return AccountProfileServices;
        })();
        Services.AccountProfileServices = AccountProfileServices;
        var ItemsServices = (function () {
            //Property to hold profiles
            //public profiles;
            //Property to hold selected profile
            //public selectedProfile
            //constructor with $resource dependency injection
            function ItemsServices($resource, profileService) {
                this.profileService = profileService;
                this.ItemResource = $resource("/api/ItemsModels/:id");
                this.ItemByUserResource = $resource("api/ItemsModels/DisplayByUser/");
                this.ItemByProfileResource = $resource("api/ItemsModels/DisplayByProfile/:id");
                this.AccountResource = $resource("/api/AccountProfile/:id");
            }
            //Read Items for specific login
            ItemsServices.prototype.listItemsByUser = function () {
                var items = this.ItemByUserResource.query();
                return items;
            };
            //Read Items for specific profile
            ItemsServices.prototype.listItemsByProfile = function (profileId) {
                var items = this.ItemByProfileResource.query({ id: profileId });
                return items;
            };
            //Read all Items for any login - restricted to admin users only on server side
            ItemsServices.prototype.listAllItems = function () {
                var items = this.ItemResource.query();
                return items;
            };
            //Create/Save item
            ItemsServices.prototype.SaveItem = function (item) {
                return this.ItemResource.save(item).promise;
            };
            //Fetch specific item
            ItemsServices.prototype.getItem = function (id) {
                return this.ItemResource.get({ id: id });
            };
            //Delete item
            ItemsServices.prototype.deleteItem = function (id) {
                return this.ItemResource.delete({ id: id }).promise;
            };
            return ItemsServices;
        })();
        Services.ItemsServices = ItemsServices;
        //CRUD class for tags (items - uses a JSON file)
        //Expand on this if I have time - mainly for testing
        var TagsServices = (function () {
            //constructor with dependency injection
            function TagsServices($resource) {
                this.TagResource = $resource("/characteristics.json");
            }
            //Read tags
            TagsServices.prototype.readTags = function () {
                return this.TagResource.get();
            };
            return TagsServices;
        })();
        Services.TagsServices = TagsServices;
        //registering the services
        angular.module("WMS").service("tagsService", TagsServices);
        angular.module("WMS").service("itemsService", ItemsServices);
        angular.module("WMS").service("profileService", AccountProfileServices);
    })(Services = WMS.Services || (WMS.Services = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=CRUDServices.js.map