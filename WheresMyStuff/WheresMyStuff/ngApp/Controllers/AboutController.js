var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        var AboutController = (function () {
            function AboutController() {
                this.center = {
                    latitude: 37.09024,
                    longitude: -100.712891
                };
                this.zoom = 4;
                this.markers = [
                    {
                        id: 0,
                        options: {
                            title: "You are here"
                        },
                        //pass in the address from the User Info                
                        latitude: 33.5000,
                        longitude: -112.0060
                    },
                ];
                this.message = "Hello from the About page!";
            }
            return AboutController;
        })();
        Controllers.AboutController = AboutController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
