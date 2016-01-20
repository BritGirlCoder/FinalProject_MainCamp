var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var ItemsController = (function () {
            //Holds the image of the current item - doesn't work - can't pass in multiple objects to modal with resolve
            //public itemImageSrc;
            //private keywords so class can access them
            function ItemsController(tagsService, itemsService, /*private tempData: WMS.Data.ItemsTempData*/ $uibModal, $location) {
                this.itemsService = itemsService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                //Testing: reading tags from the service
                //this.tags = tagsService.readTags();
                //console.log(this.tags);
                //Testing - ensuring routing works correctly
                //this.message = "Hello from the Items page!"
            }
            ItemsController.prototype.showModal = function (item) {
                //this.itemImageSrc = this.item.photo;
                //Opens the modal with the options specified in the argument object
                this.$uibModal.open({
                    templateUrl: '/ngApp/Views/ItemModal.html',
                    controller: 'ItemModalController',
                    controllerAs: 'wms',
                    //resolve will allow the animalName to be passed to the data variable and then it
                    //will be passed to the ModalController class *as "data"*
                    //can use this in my personal project - the entire item object
                    resolve: {
                        data: function () { return item; } //pass the item in
                    },
                    size: 'lg'
                });
                console.log(this.item);
            };
            ;
            ItemsController.prototype.createItem = function () {
                var _this = this;
                this.itemsService.SaveItem(this.itemToAdd).then(function () {
                    _this.$location.path("/items");
                    //TESTING ONLY - console.log("ItemsController createItem method");
                });
            };
            ItemsController.prototype.displayItems = function () {
                this.items = this.itemsService.listItems();
            };
            return ItemsController;
        })();
        Controllers.ItemsController = ItemsController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
