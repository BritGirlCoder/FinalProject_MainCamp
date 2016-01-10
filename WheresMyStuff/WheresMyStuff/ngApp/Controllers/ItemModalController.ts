namespace WMS.Controllers {

    export class ItemModalController {

        //Public property to hold the item
        public item;
        public message;

        //We're passing in the temporary message property from the showModal method in the ItemsController
        //this will be replaced with the real data passed in from the table listing items in Items.html
        //Also passing in a modal instance
        constructor(private data, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private itemsService: WMS.Services.ItemsServices, private $routeParams: ng.route.IRouteParamsService) {
            //Will have to call the getItem(itemID) in CRUDServices and assign to the item property for use
            //in the edit & delete methods here
            this.message = this.data;
        }
        
        //Called from close button on modal
        //Doesn't work - maybe because it doesn't recognize
        closeModal() {
            this.$modalInstance.close();
        }

        //Called from Edit button on modal
        //Will need to have the id of the item passed in
        editItem(item) {
            this.item = this.itemsService.getItem(this.$routeParams["id"]);
            //Then? .then(() => {this.closeModal()});
            this.itemsService.saveItem(this.item);
            this.closeModal();
        }

        //called from Delete button on modal
        //Will need to have the id of the item passed in
        deleteItem(item) {
            this.item = this.itemsService.getItem(this.$routeParams["id"]);
            //Then? .then(() => {this.closeModal()});
            this.itemsService.deleteItem(this.item.id);
            this.closeModal();
        }
    }
    //registering the modal controller - have to do this as modals don't work with routing (*research)
    angular.module("WMS").controller("ItemModalController", ItemModalController);
}