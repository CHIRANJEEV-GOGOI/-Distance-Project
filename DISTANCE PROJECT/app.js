// set map option

var myLatLng = {lat: 27.4750, lng: 94.9125};
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};


//create map

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

// create a direction service object to use the route mathod and get result for our request

var directionService = new google.maps.DirectionsService();

// create a DirectionRenderer object which we will use to display the route

var directionsDisplay = new google.maps.DirectionsRenderer();

// bind the directionsRenderer to the map

directionsDisplay.setMap(map);

// function 

function calcRoute(){
    // create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.WALKING, // WALKING, BYCYCLING AND TRANSIT
        unitSystem: google.maps.unitSystem.IMPERIAL
    }
    
    // Pass the request to the route method
    directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionStatus.OK) {

                // get Distance and Time
                const output = document.querySelector('#output');
                output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fa-solid fa-road'></i>:" + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fa-duotone fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";


                //display route
                directionsDisplay.setDirections(result);
                {
                    //delete route from map
                    directionsDisplay.setDirections({ routes: [] });

                    //center map in dibrugarh
                    map.setCenter(myLatLng);

                    //show error message
                    output.innerHTML = "<div class='alert-danger'><i class='fa-solid fa-square-exclamation'></i> Could not retrieve dirving distance. </div>";
                }
            }
        });
}

// create autocomplete objects for all input

var options = {
    types: ['(cities']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options)

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options)


