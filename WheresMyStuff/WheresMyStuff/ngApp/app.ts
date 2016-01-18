namespace WMS {

    //Main module set-up. Injecting ngRoute, ngResource
    angular.module("WMS", ["ngRoute", "ngResource", "ui.bootstrap"]).config(($routeProvider: ng.route.IRouteProvider,
        $locationProvider: ng.ILocationProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: "ngApp/Views/Main.html",
                controller: WMS.Controllers.MainController,
                controllerAs: "wms"
            })
            .when("/about", {
                templateUrl: "ngApp/Views/About.html",
                controller: WMS.Controllers.AboutController,
                controllerAs: "wms"
            })
            .when("/items", {
                templateUrl: "ngApp/Views/Items.html",
                controller: WMS.Controllers.ItemsController,
                controllerAs: "wms"
            })
            .when("/profile", {
                templateUrl: "ngApp/Views/Profile.html",
                controller: WMS.Controllers.ProfileController,
                controllerAs: "wms"
            })            
            .otherwise({
                redirectTo: "/"
            });
        $locationProvider.html5Mode(true);
    });
}