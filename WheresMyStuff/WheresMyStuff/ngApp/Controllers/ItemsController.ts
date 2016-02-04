namespace WMS.Controllers {

    export class ItemsController {
       
        //Holds current active profile
        public profile;
        //Holds all profiles for currently logged in user
        public profiles;

        //Holds an item from the items page / returned item from ItemsServices
        public item;
        //Holds item to edit
        public itemToEdit;
        //Holds an item to add
        public itemToAdd;
        //Holds a list of items from ItemsServices
        public items;
        //Holds the image file information of the current item
        public file;
        //Property to hold selected profile
        public selectedProfile
        //property to hold profileModelId
        public profileModelId;
        //property to hold any validation errors
        public validationErrors;
        //property to hold search textbox value
        public filterValue;

        //private keywords so class can access them
        constructor(private itemsService: WMS.Services.ItemsServices, private profileService: WMS.Services.AccountProfileServices, private $uibModal: angular.ui.bootstrap.IModalService, private $location: ng.ILocationService, private filepickerService, private $scope: ng.IScope, private $route: ng.route.IRouteService) {                      
                        
            this.itemToEdit = {};

            //need to do explicitly create the item object in the constructor so it actually exists.  The browser does not always do it automatically when setting the property
            this.item = {};
            this.displayUserItems();
            this.profiles = this.profileService.getAccountProfileByUser();            
        }

        showModal(item, profile) {            
            //Opens the modal with the options specified in the argument object
            this.$uibModal.open({
                templateUrl: '/ngApp/Views/ItemModal.html',
                controller: 'ItemModalController',
                controllerAs: 'wms',
                //resolve will allow the item to be passed to the data variable and then
                //passed to the ModalController class *as "data"*                
                resolve: {
                    data: () => item, //pass the item in
                    acctProfile: () => profile
                },
                size: 'lg'
            });            
        };
        
        populateItemWithProfileID() {            
            this.profileModelId = this.selectedProfile.id;
        }

        //creates an item
        createItem() {            
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
            this.itemsService.SaveItem(this.itemToAdd).then(() => {
                this.itemsService.listItemsByUser;
                this.$route.reload();
                this.itemToAdd = null;
                //Catch allows us to get any error messages
            }).catch((error) => {
                for (var i in error.data.modelState) {
                    var errorMessage = error.data.modelState[i];
                    this.validationErrors = this.validationErrors.concat(errorMessage);
                }
            });
        }

        //Displays all items - restricted to admins only:
        displayAllItems() {
            this.items = this.itemsService.listAllItems();
        }
        
        //Displays items for specific user login
        displayUserItems() {
            this.items = this.itemsService.listItemsByUser();            
        }

        //Displays items for specific profile from logged in user
        displayProfileItems() {            
            this.profileModelId = this.selectedProfile.id;            
            this.items = this.itemsService.listItemsByProfile(this.profileModelId);
        }     

        //Used when creating an item
        public pickFile() {
            this.filepickerService.pick(
                { mimetype: "image/*" },
                this.fileUploaded.bind(this)
            );
        }

        //Used when creating an item
        public fileUploaded(file) {
            //save file url to database            
            this.file = file;
            this.$scope.$apply();            
            this.itemToAdd.itemPhoto = file.url;      
        }

        //Used when editing an item
        public pickFileEdit(item) {
            this.itemToEdit = item;
            this.filepickerService.pick(
                { mimetype: "image/*" },
                this.fileUploadedEdit.bind(this)
            );
        }
        //Used when editing an item
        public fileUploadedEdit(file) {
            console.log("fileUploadedEdit");
            //save file url to database
            this.file = file;
            this.itemToEdit.itemPhoto = this.file.url;
            this.$scope.$apply();  
            this.itemsService.SaveItem(this.itemToEdit);
        }
    }
}