function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("main", {
            url: "/",
            templateUrl: require("./controllers/home/home.page.html"),
            controller: "homeController",
            title: ""
        });
}

export default ["$stateProvider", "$urlRouterProvider", "$locationProvider", config];