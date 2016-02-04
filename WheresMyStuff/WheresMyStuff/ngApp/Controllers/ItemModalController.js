var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var ItemModalController = (function () {
            //We're passing in the public item property from the showModal method in the ItemsController
            //Also passing in a modal instance, routeparams
            function ItemModalController(data, acctProfile, $uibModalInstance, itemsService, profileService, filepickerService, $scope, $location, $routeParams, $route) {
                this.data = data;
                this.acctProfile = acctProfile;
                this.$uibModalInstance = $uibModalInstance;
                this.itemsService = itemsService;
                this.profileService = profileService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$route = $route;
                this.item = this.data;
                this.currentProfile = this.acctProfile;
                this.profiles = this.profileService.getAccountProfileByUser();
            }
            //Called from close button on modal
            ItemModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            //called when selected profile changes:
            ItemModalController.prototype.populateItemWithProfileID = function () {
                this.profileModelId = this.selectedProfile.id;
            };
            //Called from Edit button on modal
            //Will need to have the id of the item passed in
            ItemModalController.prototype.editItem = function () {
                this.item.profileModelsId = this.profileModelId;
                this.item.profile = this.selectedProfile;
                this.item.isActive = true;
                this.item.itemOwner = this.selectedProfile.fullname;
                this.itemsService.SaveItem(this.item);
                this.closeModal();
            };
            //called from Delete button on modal
            //Will need to have the id of the item passed in
            ItemModalController.prototype.deleteItem = function () {
                //Hard delete code below:
                //this.itemsService.deleteItem(this.item.id);
                var _this = this;
                //Soft delete
                console.log("this is the modalcontroller");
                this.item.isActive = false;
                this.itemsService.SaveItem(this.item).then(function () {
                    console.log(_this.item);
                    _this.$route.reload();
                    _this.closeModal();
                });
                this.itemsService.listItemsByUser;
            };
            ItemModalController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: "image/*" }, this.fileUploaded.bind(this));
            };
            ItemModalController.prototype.fileUploaded = function (file) {
                //save file url to database
                this.file = file;
                this.$scope.$apply();
                console.log(this.file.url);
                this.item.itemPhoto = file.url;
                console.log(this.item.itemPhoto);
            };
            return ItemModalController;
        })();
        Controllers.ItemModalController = ItemModalController;
        //registering the modal controller - have to do this as modals don't work with routing (*research)
        angular.module("WMS").controller("ItemModalController", ItemModalController);
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=ItemModalController.js.map