
  var map;
  var myLocation;
  var myBounds;
  var myCountry = 'de';
  var geocoder = new google.maps.Geocoder();
  var socket;
  
  /* If document is ready, begin... */
  $(document).ready(function() {     
    //var socketIoProviderClient = new SocketIoProviderClient('http://localhost', 8000);
    var socketIoProviderClient = new SocketIoProviderClient('http://localhost', 8000);
    var geoLocateProvider = new GeoLocateProvider();
    var mapProvider = null; 

    geoLocateProvider.ipLocationPackage( function (error, results) {
    if(!error) {
      if(results[0].geometry.location) {
        mapProvider = new MapProvider('map_canvas', 'searchLocation', results[0].geometry.location, geoLocateProvider, socketIoProviderClient);
        $('input#searchLocation').val(results[0].address_components[0].long_name);
        socketIoProviderClient.setMapProvider(mapProvider);
      }
    }else {
      geoLocateProvider.defaultLocationPackage( function (error, results) {
        if(!error) {
          if(results[0].geometry.location) {
            mapProvider = new MapProvider('map_canvas', 'searchLocation', results[0].geometry.location, geoLocateProvider, socketIoProviderClient);
            $('input#searchLocation').val(results[0].address_components[0].long_name);
            socketIoProviderClient.setMapProvider(mapProvider);
          }
        }
      });
    }
  });
    

  });
    
    
    
    /*
    $('#searchLocation').focusin(function () {
      $(document).keypress(function (e) {
        if (e.which == 13) {
          var firstResult = $(".pac-container .pac-item:first").text();
          console.log('Enter pressed');
          geoLocateProvider.geoLocateAdress(firstResult, function(error, results) {
            if(!error) {
              console.log('RES '+results[0]);
              mapProvider.showMap(results[0].geometry.location, 7, results[0].geometry.viewport);
              var placeName = results[0].address_components[0].long_name;
              $('#searchLocation').val(placeName);
            }else {
              console.log('critical: no address found');
            }
          });
        }
      });
    });
  */
    /*
  google.maps.event.addListener(mapProvider.autocomplete, 'place_changed', function() {
        var place = mapProvider.autocomplete.getPlace();
        
        if(place.geometry) {
          if (place.geometry.viewport) {
            mapProvider.map.fitBounds(place.geometry.viewport);
          }else if (place.geometry.location) { 
            mapProvider.map.setCenter(place.geometry.location);
            mapProvider.map.setZoom(17);  
          }
        }
    });     
   */
    /*
    geoLocateProvider.geoLocationPackage( function (error, results) {
      if(results) {
        console.log('results ' +results);
        mapProvider.showMap(results[0].geometry.location,7,results[0].geometry.viewport);
      }else {
        console.log('ERROR: ' + error);
      }
    });
    */

    //showMap(results[0].geometry.location,8,results[0].geometry.viewport);
    /*initialiseMap();

    $('button#geolocateLocation').click(geolocationPackage);
    $('button#submitLocation').click(submitLocation);
    $('button#allStations').click(getAllStations);
    
    nitSocket();    
    autocomplete();
    */
    /*
    var loc = null;
    
    for(var i = 0; i < dresden.length; i++) {
      if(dresden[i].latLng.latitude == '') {
        var loc = dresden[i].location + ' ' + dresden[i].zip + ' ' + dresden[i].street + ' ' + dresden[i].number;
        codeLatLng(i,function(j, addr) {
            if(addr == null) {
              //console.log('Addresse null' + i);
              //console.log(dresden);
              return;
            }else {
              console.log('Addresse not null j' + j);
              dresden[j].latLng.latitude = addr.geometry.location.Ya;
              dresden[j].latLng.longitude = addr.geometry.location.Za;
              console.log(JSON.stringify(dresden));
            }
        });
      }
      
      function codeLatLng(j, callback) {
        geocoder.geocode({'address':loc}, function(results, status) {
          if(status == google.maps.GeocoderStatus.OK) {
            callback(j, results[0]);
          }else {
            callback(null, null);
          }
        });
      };
    }
    */