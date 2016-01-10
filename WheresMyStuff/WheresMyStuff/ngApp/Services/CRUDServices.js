//This file contains all the CRUD Services for both items and users
var WMS;
(function (WMS) {
    var Services;
    (function (Services) {
        //CRUD class for users (profile view/controller)
        // export class UsersServices {
        //    //property to hold userss $resource
        //    private UserResource;
        //    //constructor with $resource dependency injection
        //    constructor($resource: ng.resource.IResourceService) {
        //        this.UserResource = $resource("");
        //    }
        //    //Read Users
        //    public listUsers() {
        //        return this.UserResource.query();
        //    }
        //Create user
        //public createUser(user) {
        //return console.log("create User");
        //        return this.UserResource.save(item).$promise;
        //}
        //    //Fetch specific user
        //    public getMovie(id: number) {
        //        return this.UserResource.get({id: id});
        //    }
        //    //Delete user
        //    public deleteUser(id: number) {
        //        return this.UserResource.delete({ id: id }).promise;
        //    }
        // }
        //**TODO - once backend db is complete, will need to access the items table in db via webapi
        //**TODO - build dummy array of items for testing & point ItemResource at that instead
        //CRUD class for items (items view/controller)
        var ItemsServices = (function () {
            //constructor with $resource dependency injection
            function ItemsServices($resource) {
                this.ItemResource = $resource("");
            }
            //Read Items
            ItemsServices.prototype.listItems = function () {
                return this.ItemResource.query();
            };
            //Create/Save item
            ItemsServices.prototype.saveItem = function (item) {
                return this.ItemResource.save(item).$promise;
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
        //registering the service with the module.  Note that we have what we'll call it and then the function
        //(class in this case) that actually has the functionality for the service
        angular.module("WMS").service("tagsService", TagsServices);
        angular.module("WMS").service("itemsService", ItemsServices);
    })(Services = WMS.Services || (WMS.Services = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=CRUDServices.js.map