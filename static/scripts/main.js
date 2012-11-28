
  var map;
  var myLocation;
  var myBounds;
  var myCountry = 'de';
  var geocoder = new google.maps.Geocoder();
  var socket;
  
  /* If document is ready, begin... */
  $(document).ready(function() {     
    var socketIoProviderClient = new SocketIoProviderClient('http://localhost', 8000);
    var geoLocateProvider = new GeoLocateProvider();
    var mapProvider = new MapProvider('map_canvas', 'searchLocation', geoLocateProvider, socketIoProviderClient); 
  });