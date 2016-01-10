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
                image: "http://www.vossrdstorage.com/wp-content/themes/voss/images/self-storage-sugarland-tx.jpg",
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