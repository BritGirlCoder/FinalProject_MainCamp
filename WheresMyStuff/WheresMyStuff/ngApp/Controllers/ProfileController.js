var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        //This controller is for the profile (log-in/add users) page
        var ProfileController = (function () {
            function ProfileController() {
                this.message = "Hello from the Profile page!";
            }
            ProfileController.prototype.createAccount = function (account) {
                console.log("Creating Account");
            };
            ProfileController.prototype.editAccount = function (account) {
                console.log("Editing Account");
            };
            ProfileController.prototype.createUser = function (user) {
                console.log("Creating User");
            };
            return ProfileController;
        })();
        Controllers.ProfileController = ProfileController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=ProfileController.js.map