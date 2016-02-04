namespace WMS.Controllers {
    export class AboutController {        

        constructor() {
            
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
                    title: "Start here"
                },
                //TODO - pass in the address from the User Info                
                latitude: 37.09024,
                longitude: -100.712891
            },            
        ]

        //Code to implement for Google Maps searchbox
        //public events = {
        //    places_changed: function (searchBox) {
        //        var place = searchBox.getPlaces();
        //    }
        //}
        //public searchbox = {
        //    template: 'searchbox.tpl.html', events: this.events
        //};
    }

}