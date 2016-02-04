var WMS;
(function (WMS) {
    var Controllers;
    (function (Controllers) {
        //This controller is for the home (main) page
        var MainController = (function () {
            function MainController() {
                //Carousel items
                this.myInterval = 5000;
                this.noWrapSlides = false;
                this.slides = [
                    {
                        image: "http://roadrunnermoverscleveland.com/wp-content/uploads/2015/02/banner.jpg",
                        text: "Moving?"
                    },
                    {
                        image: "http://www.mgr-storage.co.uk/pliki/s2c2.jpg",
                        text: "What's in Storage?"
                    },
                    {
                        image: "http://jarrettsvillefurniture.com/wp-content/uploads/page-header-sale-current.jpg",
                        text: "House Clearance?"
                    }
                ];
            }
            return MainController;
        })();
        Controllers.MainController = MainController;
    })(Controllers = WMS.Controllers || (WMS.Controllers = {}));
})(WMS || (WMS = {}));
//# sourceMappingURL=MainController.js.map