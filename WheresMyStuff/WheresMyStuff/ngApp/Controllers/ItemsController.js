var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var ItemsController = (function () {
            //private keywords so class can access them
            function ItemsController(tagsService, itemsService, $modal, $location) {
                this.itemsService = itemsService;
                this.$modal = $modal;
                this.$location = $location;
                //Testing: reading tags from the service
                this.tags = tagsService.readTags();
                console.log(this.tags);
                //Testing - ensuring routing works correctly
                this.message = "Hello from the Items page!";
            }
            ItemsController.prototype.showModal = function () {
                var _this = this;
                //Opens the modal with the options specified in the argument object
                this.$modal.open({
                    templateUrl: '/ngApp/Views/ItemModal.html',
                    controller: 'ItemModalController',
                    controllerAs: 'wms',
                    //resolve will allow the animalName to be passed to the data variable and then it
                    //will be passed to the ModalController class *as "data"*
                    //can use this in my personal project - the entire item object
                    resolve: {
                        data: function () { return _this.item; } //pass the item in
                    },
                    size: 'lg'
                });
            };
            ;
            ItemsController.prototype.createItem = function () {
                var _this = this;
                this.itemsService.saveItem(this.item).then(function () {
                    _this.$location.path("/items");
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
//# sourceMappingURL=ItemsController.js.map