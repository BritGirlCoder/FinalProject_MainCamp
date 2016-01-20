namespace WMS.Controllers {
    export class AboutController {
        public message;

        constructor() {
            this.message = "Hello from the About page!"
        }

        public center = {
            latitude: 37.09024,
            longitude: -100.712891
        };

        public zoom = 4;

        public markers = [
            {
                id: 0,
                options: {
                    title: "You are here"
                },
                //pass in the address from the User Info                
                latitude: 33.5000,
                longitude: -112.0060
            },            
        ]

    }

}