//This file contains all the CRUD Services for both items and users

namespace WMS.Services {

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


    export class ItemsServices {
        //property to hold items $resource
        private ItemResource;
        //***THIS SHOULD BE IN ITEMSCONTROLLER?
        private item;

        //constructor with $resource dependency injection
        constructor($resource: ng.resource.IResourceService /*itemsTempData: WMS.Data.ItemsTempData*/) {
            //**NONE OF THESE WORK
            //this.ItemResource = $resource("/api/ItemsModelsController/:id");
            //this.ItemResource = $resource("../api/ItemsModelsController/:id");
            this.ItemResource = $resource("../api/ItemsModels/:id");
            this.listItems();
        }

        //Read Items
        public listItems() {
            return this.ItemResource.query();
        }

        //Create/Save item
        public SaveItem(item) {
            //**NOT SURE HOW TO CHANGE THIS FOR USE WITH ANG ItemsCONTROLLER            
            return this.ItemResource.save(item).$promise.then(() => {
                this.item = null;
                this.listItems();
                //TESTING ONLY - console.log("CRUDServices SaveItem method");
            });
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


    //registering the service with the module.  Note that we have what we'll call it and then the function
    //(class in this case) that actually has the functionality for the service
    angular.module("WMS").service("tagsService", TagsServices);
    angular.module("WMS").service("itemsService", ItemsServices);
}