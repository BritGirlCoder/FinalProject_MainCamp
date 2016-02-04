var WMS;
(function (WMS) {
    //Main module set-up. Injecting ngRoute, ngResource
    angular.module("WMS", ["ngRoute", "ngResource", "ui.bootstrap", "uiGmapgoogle-maps", "angular-filepicker"]).config(function ($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider, filepickerProvider) {
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
            .when('/login', {
            templateUrl: '/ngApp/views/login.html',
            controller: WMS.Controllers.LoginController,
            controllerAs: 'wms'
        })
            .when('/register', {
            templateUrl: '/ngApp/views/register.html',
            controller: WMS.Controllers.RegisterController,
            controllerAs: 'wms'
        })
            .when('/confirmEmail', {
            templateUrl: '/ngApp/views/confirmEmail.html',
            controller: WMS.Controllers.ConfirmEmailController,
            controllerAs: 'wms'
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
            .when("/notFound", {
            templateUrl: "ngApp/Views/notFound.html",
            controller: WMS.Controllers.NotFoundController,
            controllerAs: "wms"
        })
            .otherwise({
            redirectTo: "ngApp/Views/Main.html"
        });
        $locationProvider.html5Mode(true);
        uiGmapGoogleMapApiProvider.configure({
            //add key here if needed
            //need this for future searchbox
            libraries: 'places'
        });
        filepickerProvider.setKey("AOq251UJISh6jm9381q64z");
    });
    angular.module('WMS').factory('authInterceptor', function ($q, $window, $location) {
        return ({
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        });
    });
    angular.module('WMS').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(WMS || (WMS = {}));
//# sourceMappingURL=app.js.map