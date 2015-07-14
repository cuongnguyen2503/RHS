$(document).ready(function(){
  $("#mylocation").click(function(){
    geoLocation();
  });
});

var map;
var myLatlng;
var infowindow = new google.maps.InfoWindow({
  size: new google.maps.Size(150, 50)});

function initialize() {
  myLatlng = new google.maps.LatLng(21.017030, 105.783902);
  var image = "/assets/pin.png";
  var markers = [];
  var myOptions = {
    zoom: 13,
    center: myLatlng,
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: image,
    title:"Property Location"
  });

  formlat = document.getElementById("form-lat").value = myLatlng.lat();
  formlng = document.getElementById("form-lng").value = myLatlng.lng();

  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(20.9102, 105.7759),
    new google.maps.LatLng(21.217030, 105.793902));
  map.fitBounds(defaultBounds);

  var input = (document.getElementById("pac-input"));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));
  google.maps.event.addListener(searchBox, "places_changed", function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = "/assets/pin.png";
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
  google.maps.event.addListener(map, "bounds_changed", function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  google.maps.event.addListener(map, "click", function() {
    infowindow.close();
  });

  google.maps.event.addListener(map, "click", function(event) {
    if (marker) {
      marker.setMap(null);
      marker = null;
    }
    var myLatLng = event.latLng ;
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      title:"Property Location"
    });
    formlat = document.getElementById("form-lat").value = event.latLng.lat();
    formlng = document.getElementById("form-lng").value = event.latLng.lng();
  });
}

function geoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("No Gelocation Support!");
  }
}

function showPosition(position) {
  geolocate = new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);

  var marker = new google.maps.Marker({
    map: map,
    position: geolocate,
    icon: "/assets/geo.png"
  });

  map.setCenter(geolocate);
}

function gmap_show_addresses(addresses) {
  for (var i = 1; i < addresses.length; i++) {
    var position = new google.maps.LatLng(
      addresses[i].lat,
      addresses[i].lng);
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      id: addresses[i].id
    });
    marker.setTitle((i + 1).toString());
    attachSecretMessage(marker, i);
  }
}

function attachSecretMessage(marker, num) {
  google.maps.event.addListener(marker, "click", function() {
    $.fancybox({
      "type" : "iframe",
      "href" : gethost() +"/addresses/"+ addresses[num].id,
      "overlayShow" : true,
      "centerOnScroll" : true,
      "speedIn" : 100,
      "speedOut" : 50,
      "width" : "80%",
      "height" : "80%"
    });
  });
}
