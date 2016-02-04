namespace WMS.Controllers {

    //This controller is for the home (main) page
    export class MainController {
        //Carousel items
        public myInterval = 5000;
        public noWrapSlides = false;
        public slides = [
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

        public message;
        
        constructor() {}
    }
}