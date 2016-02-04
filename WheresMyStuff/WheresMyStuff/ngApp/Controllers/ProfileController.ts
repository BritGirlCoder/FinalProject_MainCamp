namespace WMS.Controllers {

    //This controller is for the profile (log-in/add users) page
    export class ProfileController {

        //Holds current active profile
        public profile;
        //Holds all profiles for currently logged in user
        public profiles;
        //Property to hold selected profile
        public selectedProfile
        //Property to hold the validation errors passed back from the server side
        public validationErrors;
        
        constructor(private profileService: WMS.Services.AccountProfileServices, private $location: ng.ILocationService, private $route: ng.route.IRouteService) {
            this.getProfile();
        }

        //displays profiles for a specific user login
        getProfile() {
            this.profiles = this.profileService.getAccountProfileByUser();
        }

        //sets current profile to selected profile so fields can be populated
        populateFields() {
            this.profile = this.selectedProfile;
        }

        //creates a new profile
        createProfile() {
            //Array for validation errors
            this.validationErrors = [];            

            this.profile.isActive = true;
            this.profileService.createAccountProfile(this.profile).then(() => { 
                this.$route.reload();
            }).catch((error) => {
                //loop through error messages and populate the validationErrors array
                for (let i in error.data.modelState) {
                    var errorMessage = error.data.modelState[i];
                    this.validationErrors = this.validationErrors.concat(errorMessage);
                }
            }); 
        }

        editProfile() {
            //Array for validation errors
            this.validationErrors = [];
            //ensure profile is active
            this.profile.isActive = true;
            this.profileService.saveAccountProfile(this.profile).then(() => {
                //reload the page
                this.$route.reload();
            }).catch((error) => {
                for (let i in error.data.modelState) {
                    var errorMessage = error.data.modelState[i];                    
                    this.validationErrors = this.validationErrors.concat(errorMessage);
                }
            }); 
        }

        deleteProfile(profile)
        {
            this.profile.isActive = false;
            this.profileService.saveAccountProfile(this.profile).then(() => {
                this.$route.reload();
            });
        }
        
        
    }
}