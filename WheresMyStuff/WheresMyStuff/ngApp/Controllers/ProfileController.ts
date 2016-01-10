namespace WMS.Controllers {

    //This controller is for the profile (log-in/add users) page
    export class ProfileController {
        public user;
        public message;

        constructor() {
            this.message = "Hello from the Profile page!"
        }

        createAccount(account) {
            console.log("Creating Account");
        }

        editAccount(account) {
            console.log("Editing Account");
        }

        createUser(user) {
            console.log("Creating User");
        }
    }
}