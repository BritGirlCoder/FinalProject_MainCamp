var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var ItemsController = (function () {
            //private keywords so class can access them
            function ItemsController(itemsService, profileService, $uibModal, $location, filepickerService, $scope, $route) {
                this.itemsService = itemsService;
                this.profileService = profileService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$route = $route;
                this.itemToEdit = {};
                //need to do explicitly create the item object in the constructor so it actually exists.  The browser does not always do it automatically when setting the property
                this.item = {};
                this.displayUserItems();
                this.profiles = this.profileService.getAccountProfileByUser();
            }
            ItemsController.prototype.showModal = function (item, profile) {
                //Opens the modal with the options specified in the argument object
                this.$uibModal.open({
                    templateUrl: '/ngApp/Views/ItemModal.html',
                    controller: 'ItemModalController',
                    controllerAs: 'wms',
                    //resolve will allow the item to be passed to the data variable and then
                    //passed to the ModalController class *as "data"*                
                    resolve: {
                        data: function () { return item; },
                        acctProfile: function () { return profile; }
                    },
                    size: 'lg'
                });
            };
            ;
            ItemsController.prototype.populateItemWithProfileID = function () {
                this.profileModelId = this.selectedProfile.id;
            };
            //creates an item
            ItemsController.prototype.createItem = function () {
                var _this = this;
                //Array for validation errors
                this.validationErrors = [];
                //We're adding in the profileModelsId and the profile object so we can capture the userId
                this.itemToAdd.profileModelsId = this.profileModelId;
                this.itemToAdd.profile = this.selectedProfile;
                this.itemToAdd.profile.userId = this.selectedProfile.userId;
                //This value is not set by the user, so we're setting it here            
                this.itemToAdd.isActive = true;
                //Not really needed, but may use in the future
                this.itemToAdd.itemOwner = this.selectedProfile.fullname;
                //After item has successfully saved, we refresh the view & set the itemToAdd to null
                this.itemsService.SaveItem(this.itemToAdd).then(function () {
                    _this.itemsService.listItemsByUser;
                    _this.$route.reload();
                    _this.itemToAdd = null;
                    //Catch allows us to get any error messages
                }).catch(function (error) {
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        _this.validationErrors = _this.validationErrors.concat(errorMessage);
                    }
                });
            };
            //Displays all items - restricted to admins only:
            ItemsController.prototype.displayAllItems = function () {
                this.items = this.itemsService.listAllItems();
            };
            //Displays items for specific user login
            ItemsController.prototype.displayUserItems = function () {
                this.items = this.itemsService.listItemsByUser();
            };
            //Displays items for specific profile from logged in user
            ItemsController.prototype.displayProfileItems = function () {
                this.profileModelId = this.selectedProfile.id;
                this.items = this.itemsService.listItemsByProfile(this.profileModelId);
            };
            //Used when creating an item
            ItemsController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: "image/*" }, this.fileUploaded.bind(this));
            };
            //Used when creating an item
            ItemsController.prototype.fileUploaded = function (file) {
                //save file url to database            
                this.file = file;
                this.$scope.$apply();
                this.itemToAdd.itemPhoto = file.url;
            };
            //Used when editing an item
            ItemsController.prototype.pickFileEdit = function (item) {
                this.itemToEdit = item;
                this.filepickerService.pick({ mimetype: "image/*" }, this.fileUploadedEdit.bind(this));
            };
            //Used when editing an item
            ItemsController.prototype.fileUploadedEdit = function (file) {
                console.log("fileUploadedEdit");
                //save file url to database
                this.file = file;
                this.itemToEdit.itemPhoto = this.file.url;
                this.$scope.$apply();
                this.itemsService.SaveItem(this.itemToEdit);
            };
            return ItemsController;
        })();
        Controllers.ItemsController = ItemsController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=ItemsController.js.map