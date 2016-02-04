namespace WMS.Controllers {

    export class ItemModalController {

        //Public property to hold the current item
        public item;
        //Holds the image file information of the current item
        public file;
        //public property to hold the selectedProfile
        public selectedProfile;
        //public property to hold the profiles
        public profiles;
        //property to hold current profile
        public currentProfile;
        //property to hold profileModelId
        public profileModelId;


        //We're passing in the public item property from the showModal method in the ItemsController
        //Also passing in a modal instance, routeparams
        constructor(private data, private acctProfile, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private itemsService: WMS.Services.ItemsServices, private profileService: WMS.Services.AccountProfileServices, private filepickerService, private $scope: ng.IScope, private $location: ng.ILocationService, private $routeParams: ng.route.IRouteParamsService, private $route: ng.route.IRouteService) {
                        
            this.item = this.data;
            this.currentProfile = this.acctProfile;
            
            this.profiles = this.profileService.getAccountProfileByUser();
        }
        
        //Called from close button on modal
        closeModal() {
            this.$uibModalInstance.close();
        }

        //called when selected profile changes:

        populateItemWithProfileID() {
            this.profileModelId = this.selectedProfile.id;
        }

        //Called from Edit button on modal
        //Will need to have the id of the item passed in
        editItem() {            
            this.item.profileModelsId = this.profileModelId;
            this.item.profile = this.selectedProfile;
            this.item.isActive = true;            
            this.item.itemOwner = this.selectedProfile.fullname;
            this.itemsService.SaveItem(this.item);
            this.closeModal();
        }

        //called from Delete button on modal
        //Will need to have the id of the item passed in
        deleteItem() {
            //Hard delete code below:
            //this.itemsService.deleteItem(this.item.id);

            //Soft delete
            console.log("this is the modalcontroller");
            this.item.isActive = false;
            this.itemsService.SaveItem(this.item).then(() => {
                console.log(this.item);
                this.$route.reload();
                this.closeModal();
            });            
            
            this.itemsService.listItemsByUser;
        }

        public pickFile() {
            this.filepickerService.pick(
                { mimetype: "image/*" },
                this.fileUploaded.bind(this)
            );
        }

        public fileUploaded(file) {
            //save file url to database
            this.file = file;
            this.$scope.$apply();
            console.log(this.file.url);
            this.item.itemPhoto = file.url;
            console.log(this.item.itemPhoto);
        }
    }
    //registering the modal controller - have to do this as modals don't work with routing (*research)
    angular.module("WMS").controller("ItemModalController", ItemModalController);
}