// Maps API


// Function to calculate distance 

function calculateDistance() {
  var rlat1 ;
  var rlat2;

    var R = 3958.8; // Radius of the Earth in miles
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }




































$('#login').on('submit', function (event) {
  event.preventDefault();
  $.ajax({
      url: "http://localhost:1337/auth/local",
      method: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false, 
      dataType: "json",
      success: function (data) {
         getUser(data.user);
         getJWT(data.jwt);
      }
  });

});



//getUser - return the user object from userData
function getUser(user) {
  if (user) {
      localStorage.setItem("username",user.username);
      
  window.location.reload();
      return user;
  } else {
      return null;
  }
}

//getJWT - get the JWT from userData
function getJWT(jwt) {
  if (jwt) {
      
      localStorage.setItem("jwt",jwt);
      return jwt;
  } else {
      return null;
  }
}

function signOut(event) {
 
  localStorage.clear();
  window.location.reload();
  
}
 