// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'geolocation', 'gservice', 'ngRoute']);



// Configures Angular routing -- showing the relevant view and controller when needed.
app.config(function($routeProvider) {

    // Join Team Control Panel
    $routeProvider.when('/join', {
        controller: 'addCtrl',
        templateUrl: 'partials/addForm.html'

        // Find Teammates Control Panel
    }).when('/pdf', {
        controller: 'addCtrl3',
        



        // Find Teammates Control Panel
    }).when('/reset', {
        controller: 'addCtrl2',
        templateUrl: 'partials/addForm.html'

    


    }).otherwise({ redirectTo: '/join' });


});