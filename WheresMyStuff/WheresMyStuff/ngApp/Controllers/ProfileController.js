var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        //This controller is for the profile (log-in/add users) page
        var ProfileController = (function () {
            function ProfileController(profileService, $location, $route) {
                this.profileService = profileService;
                this.$location = $location;
                this.$route = $route;
                this.getProfile();
            }
            //displays profiles for a specific user login
            ProfileController.prototype.getProfile = function () {
                this.profiles = this.profileService.getAccountProfileByUser();
            };
            //sets current profile to selected profile so fields can be populated
            ProfileController.prototype.populateFields = function () {
                this.profile = this.selectedProfile;
            };
            //creates a new profile
            ProfileController.prototype.createProfile = function () {
                var _this = this;
                //Array for validation errors
                this.validationErrors = [];
                this.profile.isActive = true;
                this.profileService.createAccountProfile(this.profile).then(function () {
                    _this.$route.reload();
                }).catch(function (error) {
                    //loop through error messages and populate the validationErrors array
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        _this.validationErrors = _this.validationErrors.concat(errorMessage);
                    }
                });
            };
            ProfileController.prototype.editProfile = function () {
                var _this = this;
                //Array for validation errors
                this.validationErrors = [];
                //ensure profile is active
                this.profile.isActive = true;
                this.profileService.saveAccountProfile(this.profile).then(function () {
                    //reload the page
                    _this.$route.reload();
                }).catch(function (error) {
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        _this.validationErrors = _this.validationErrors.concat(errorMessage);
                    }
                });
            };
            ProfileController.prototype.deleteProfile = function (profile) {
                var _this = this;
                this.profile.isActive = false;
                this.profileService.saveAccountProfile(this.profile).then(function () {
                    _this.$route.reload();
                });
            };
            return ProfileController;
        })();
        Controllers.ProfileController = ProfileController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=ProfileController.js.map