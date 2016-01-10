var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var ItemModalController = (function () {
            //We're passing in the temporary message property from the showModal method in the ItemsController
            //this will be replaced with the real data passed in from the table listing items in Items.html
            //Also passing in a modal instance
            function ItemModalController(data, $modalInstance, itemsService, $routeParams) {
                this.data = data;
                this.$modalInstance = $modalInstance;
                this.itemsService = itemsService;
                this.$routeParams = $routeParams;
                //Will have to call the getItem(itemID) in CRUDServices and assign to the item property for use
                //in the edit & delete methods here
                this.message = this.data;
            }
            //Called from close button on modal
            //Doesn't work - maybe because it doesn't recognize
            ItemModalController.prototype.closeModal = function () {
                this.$modalInstance.close();
            };
            //Called from Edit button on modal
            //Will need to have the id of the item passed in
            ItemModalController.prototype.editItem = function (item) {
                this.item = this.itemsService.getItem(this.$routeParams["id"]);
                //Then? .then(() => {this.closeModal()});
                this.itemsService.saveItem(this.item);
                this.closeModal();
            };
            //called from Delete button on modal
            //Will need to have the id of the item passed in
            ItemModalController.prototype.deleteItem = function (item) {
                this.item = this.itemsService.getItem(this.$routeParams["id"]);
                //Then? .then(() => {this.closeModal()});
                this.itemsService.deleteItem(this.item.id);
                this.closeModal();
            };
            return ItemModalController;
        })();
        Controllers.ItemModalController = ItemModalController;
        //registering the modal controller - have to do this as modals don't work with routing (*research)
        angular.module("WMS").controller("ItemModalController", ItemModalController);
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=ItemModalController.js.map