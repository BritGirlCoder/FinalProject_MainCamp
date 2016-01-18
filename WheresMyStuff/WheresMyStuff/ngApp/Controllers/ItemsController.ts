namespace WMS.Controllers {

    export class ItemsController {
        //temp to show it works
        //public message;
        //Testing: Holds the returned tags
        //public tags;

        //Holds an item from the items page / returned item from ItemsServices
        public item;
        //Holds an item to add
        public itemToAdd;
        //Holds a list of items from ItemsServices
        public items;
        //Holds the image of the current item - doesn't work - can't pass in multiple objects to modal with resolve
        //public itemImageSrc;

        //private keywords so class can access them
        constructor(tagsService: WMS.Services.TagsServices, private itemsService: WMS.Services.ItemsServices, /*private tempData: WMS.Data.ItemsTempData*/ private $modal: angular.ui.bootstrap.IModalService, private $location: ng.ILocationService) {
            //Testing: reading tags from the service
            //this.tags = tagsService.readTags();
            //console.log(this.tags);
            //Testing - ensuring routing works correctly
            //this.message = "Hello from the Items page!"
        }

        showModal() {
            //this.itemImageSrc = this.item.photo;
            //Opens the modal with the options specified in the argument object
            this.$modal.open({
                templateUrl: '/ngApp/Views/ItemModal.html',
                controller: 'ItemModalController',
                controllerAs: 'wms',
                //resolve will allow the animalName to be passed to the data variable and then it
                //will be passed to the ModalController class *as "data"*
                //can use this in my personal project - the entire item object
                resolve: {
                    data: () => this.item //pass the item in
                },
                size: 'lg'
            });
            console.log(this.item);
        };
        
        createItem() {
            this.itemsService.SaveItem(this.itemToAdd).then(() => {
                this.$location.path("/items");
                //TESTING ONLY - console.log("ItemsController createItem method");
            })
        }
        
        displayItems() {
            this.items = this.itemsService.listItems();
        }        
              
    }
}