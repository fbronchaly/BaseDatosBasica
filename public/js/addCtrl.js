// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice', 'ngRoute', 'ngMaterial']);
addCtrl.controller('addCtrl', function($scope, $http, $location, geolocation, gservice) {

    // Inicio de variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    var coords = {};
    var lat = 0;
    var long = 0;
    var self = this;


    $scope.formData.usuario = "Pepe";
    $scope.formData.latitude = "";
    $scope.formData.longitude = "";
    $scope.formData.distancia = "";
    $scope.formData.distance = "";
    $scope.mostrar_resultado = false;
    $scope.ocultar_panel = true;




    // Cordenadas iniciales en el centro de España
    latitudeini = 40.4378698;
    longitudeini = -3.8196207;


    gservice.refresh(latitudeini, longitudeini);


    // Desde el formulario lanzamos los datos
    // ----------------------------------------------------------------------------

    $scope.createUser = function() {


        // Modificamos  la fecha elimando puntos para poder usar como String y le damos forma.

        var modificaFecha = moment($scope.formData.fecha).format("DD.MM.YYYY");
        console.log(modificaFecha);
        var patron = ".";
        var fecha1 = modificaFecha;
        var second = fecha1.replace(patron, '');
        basefecha = second.replace(patron, '');
        distance = $scope.formData.distance;
        basefecha2 = 'a' + basefecha;
        console.log(basefecha2);



        //*********** Esta funcion envia datos al formulario


        $scope.formData.fecha_Ok = modificaFecha;
        $scope.mostrar_resultado = true;
        $scope.ocultar_panel = false;




        gservice.refresh2($scope.formData.latitude, $scope.formData.longitude, basefecha2, distance);






    };

    $scope.reset = function() {


        $scope.formData.usuario = "";
        $scope.formData.latitude = "";
        $scope.formData.longitude = "";
        $scope.formData.distancia = "";
        $scope.formData.distance = "";




        gservice.refresh($scope.formData.latitude, $scope.formData.longitude, basefecha, distance);



    };




    var input = document.getElementById('direccion');

    var autocomplete = new google.maps.places.Autocomplete(input);



    autocomplete.addListener('place_changed', function() {

        var place = autocomplete.getPlace();
        var lati = place.geometry.location.lat();
        var lngi = place.geometry.location.lng();
        var ciudad1 = place.formatted_address; // Ciudad



        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
        } else {
            $scope.formData.latitude = lati;
            $scope.formData.longitude = lngi;
            $scope.formData.codePostal = ciudad1;

        }

    });


});
addCtrl.controller('addCtrl2', function($scope, $http, $location, geolocation, gservice) {

    // Inicio de variables
    // ----------------------------------------------------------------------------



    // Cordenadas iniciales en el centro de España
    latitudeini = 40.4378698;
    longitudeini = -3.8196207;


    gservice.refresh(latitudeini, longitudeini);
    $location.url('/join');

});