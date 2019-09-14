$.get("/api/geotest/", (data) => {
  // console.log(data);



  //SQL Pulls for latLong and Address
  var latLong = [data[0].latitude, data[0].longitude];
  var address = 'UCI DCE';

  //Need to replace setView to lat/long in database
  var mymap = L.map('mapid').setView(latLong, 13);

  //Mapbox API key + access token
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidmlvbGlubWFuYSIsImEiOiJjazBlbXFqM3QwMWZ3M2lvYTVtMTBtdzZzIn0.25nYvC4e7xl4WXKLmKFqew'
  }).addTo(mymap);

  //Add Scale to Map
  L.control.scale().addTo(mymap);

  //Add Pin to Map, replace marker with lat/long in database
  L.marker(latLong).bindPopup(address).addTo(mymap);

  //Add Circle with 1000 meters from middle point
  L.circle(latLong, { radius: 1000 }).addTo(mymap);

  // console.log(process.env);

})