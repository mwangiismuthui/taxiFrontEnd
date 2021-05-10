getAllBookings();
getAllLocations();
getAllTaxis();

var rlat1;
var rlat2;
var rlong1;
var rlong2;
var distance;
var additionalLevy;
var bookingId;
async function getAllLocations() {

  const response = await fetch("http://localhost:1337/locations");
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {


    $("#startingLocation").append('<select id = "startingLocationselect" onchange="getStartingLatLong();" class="form-control startingLocationselect"><option value="">Select Starting Location </option></select>');
    $("#destinationLocation").append('<select id = "destinationLocationselect" onchange="getDestinationLatLong(3);" class="form-control destinationLocationselect"><option value="">Select Destination Location </option></select>');

    for (var i = 0; i < data.length; i++) {
      var id = data[i].id;
      var locationName = data[i].name;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;

      $("#startingLocationselect").append('<option value="' + id + '">' + locationName + '</option>');
      $("#destinationLocationselect").append('<option value="' + id + '">' + locationName + '</option>');







    }

  }


}
async function getAllTaxis() {

  const response = await fetch("http://localhost:1337/taxis");
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {


    for (var i = 0; i < data.length; i++) {
      var id = data[i].id;
      var type = data[i].type;


      $("#taxiType").append('<option value="' + id + '">' + type + '</option>');







    }

  }


}
async function getAllBookings() {

  const response = await fetch("http://localhost:1337/bookings");
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {

    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var id = data[i].id;


      // $("#bookingList").append('<p id="oneBooking" data-id="'+data[i].id+'"><Label></Label></p>');
      $("#bookingList").append('<button type="button" id="" data-id="'+data[i].id+'" class="btn btn-warning" style="margin-left: 0px !important;">'+data[i].startLocation+' - '+data[i].destination+'</button><br><br>');
      $("#viewFare").val(data[i].fare);
      $("#viewDistanceCalculated").val(data[i].distance);
      $("#viewTaxiType").val(data[i].taxiType);
      $("#viewDestination").val(data[i].destination);
      $("#viewStartingLocation").val(data[i].startLocation);


    }

  }


}



async function getStartingLatLong() {
  var id = $(".startingLocationselect option:selected").val();


  const response = await fetch("http://localhost:1337/locations/" + id);
  // Storing data in form of JSON

  var data = await response.json();
  if (response) {




    var id = data.id;
    rlat1 = data.latitude;
    rlong1 = data.longitude;

    localStorage.setItem("start", data.name);
    distance = parseInt(calculateDistance(rlat1, rlat2, rlong1, rlong2), 0);

    $(".distance").val(distance);

  }


}

async function getDestinationLatLong() {
  var id = $(".destinationLocationselect option:selected").val();



  const response = await fetch("http://localhost:1337/locations/" + id);
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {


    var id = data.id;
    rlat2 = data.latitude;
    rlong2 = data.longitude;

    localStorage.setItem("destination", data.name);
    distance = parseInt(calculateDistance(rlat1, rlat2, rlong1, rlong2), 0);

    $(".distance").val(distance);










  }


}
async function changeTaxi() {
  var id = $("#taxiType option:selected").val();



  const response = await fetch("http://localhost:1337/taxis/" + id);
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {

    console.log(data.adittionalLevy);
    additionalLevy = data.adittionalLevy;

    localStorage.setItem("taxi", data.type);
    calculateFare(distance);

  }


}


function calculateDistance(rlat1, rlat2, rlong1, rlong2) {


  var R = 3958.8; // Radius of the Earth in miles
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (rlong2 - rlong1) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));

  localStorage.setItem("distance", d);
  return d;
}

function calculateFare(dist) {

  var flatRate = 4.20;
  var Distancebasedfarerate = 1.622 * dist;
  additionalLevy;
  var fare = parseInt(flatRate + Distancebasedfarerate + additionalLevy, 0);
  console.log(fare, flatRate, Distancebasedfarerate, additionalLevy);

  localStorage.setItem("fare", fare);
  $(".fare").val(fare);

}