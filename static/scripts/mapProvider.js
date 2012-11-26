
MapProvider = function(mapID, mapSearchID, geoObj, geoLocateProvider, socketIoProviderClient) {
  MapProvider.prototype.mapDiv = document.getElementById(mapID);
  MapProvider.prototype.inputField = document.getElementById(mapSearchID);
  MapProvider.prototype.map = null;
  MapProvider.prototype.autocomplete = null;
  MapProvider.prototype.geoLocateProvider = geoLocateProvider;
  MapProvider.prototype.socketIoProviderClient = socketIoProviderClient;
  MapProvider.prototype.distanceWidget = null;
  


  
  MapProvider.prototype.initAutocomplete = function() {  
    var myOptions = {
      types: ['geocode']
    };
  
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField, myOptions);
    this.autocomplete.bindTo('bounds', this.map);
  }

  
  MapProvider.prototype.initAutocompleteHandler = function() {
  
    var _this = this;
    
    google.maps.event.addListener(_this.autocomplete, 'place_changed', function() {
      console.log('listener');
        var place = _this.autocomplete.getPlace();
        if(place.geometry) {
          if (place.geometry.location) {
            _this.showMap(place.geometry.location);
          }
        }
    });  
    
    $('#searchLocation').focusin(function () {
      $(document).keypress(function (e) {
        if (e.which == 13) {
          takeFirstItem();
        }
      });
    });
    
    $('button#searchLocationButton').click(function () {
      takeFirstItem();
    });
    
    function takeFirstItem() {
      var firstResult = $(".pac-container .pac-item:first").text();
      _this.geoLocateProvider.geoLocateAdress(firstResult, function(error, results) {
        if(results) {
          _this.showMap(results[0].geometry.location);
          var placeName = results[0].address_components[0].long_name;
          $('#searchLocation').val(placeName);
        }else {
          console.log('focusin-handler: no address found');
        }
      });
    };
    
  }

  MapProvider.prototype.showMap = function(result) {    
    if(!this.map) {
    
      var myOptions = {
        center: result,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      this.map = new google.maps.Map(this.mapDiv, myOptions);
      this.distanceWidget = new DistanceWidget(this.map, this);
      this.distanceWidget.bindTo('position', this, 'position');    
    }else {
      this.map.setCenter(result);
    }

     var mySpot = {
       latitude: result.$a,
       longitude: result.ab,
       radius: this.distanceWidget.get('distance')/(6371)
     };    
     this.set('position', result);
     this.map.fitBounds(this.distanceWidget.get('bounds'));
     this.socketIoProviderClient.send('stations', mySpot);
     $('span#posAspanValue').text(result);
     $('span#posBspanValue').text(this.distanceWidget.get('distance'));
  } 
  
  this.showMap(geoObj);
  this.initAutocomplete();
  this.initAutocompleteHandler();
};

MapProvider.prototype = new google.maps.MVCObject();
/*
var center:LatLng = bounds.getCenter();
 
//3.
map.setZoom(map.getBoundsZoomLevel(bounds));
 
//4.
map.setCenter(center);
  */  
  /*
    console.log(latLng);
    console.log(bounds.getSouthWest());
    console.log(bounds.getNorthEast());
    console.log(bounds.getCenter());
    
    
    var marker = new google.maps.Marker({
      position: latLng, 
      map: this.map, 
      title:"Position of location"
    });
   
    var marker = new google.maps.Marker({
      position: bounds.getSouthWest(), 
      map: this.map, 
      title:"Bounds.ca"
    });
    var marker = new google.maps.Marker({
      position: bounds.getNorthEast(), 
      map: this.map, 
      title:"Bounds.ea"
    });
    var marker = new google.maps.Marker({
      position: bounds.getCenter(), 
      map: this.map, 
      title:"Bounds.center"
    });

  var R = 6371; // Radius of the Earth in km
  var dLat = (bounds.getNorthEast().lat() - bounds.getCenter().lat()) * Math.PI / 180;
  var dLon = (bounds.getNorthEast().lng() - bounds.getCenter().lng()) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(bounds.getCenter().lat() * Math.PI / 180) * Math.cos(bounds.getNorthEast().lat() * Math.PI / 180) *  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  console.log('Distanz google: '+d);
  
    var r = 3963.0;  

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    var lat1 = bounds.getCenter().lat() / 57.2958; 
    var lon1 = bounds.getCenter().lng() / 57.2958;
    var lat2 = bounds.getNorthEast().lat() / 57.2958;
    var lon2 = bounds.getNorthEast().lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    console.log('Distanz: '+dis);
  }
*/
  /*
    var marker = new google.maps.Marker({
      position: myLatlng, 
      map: map, 
      title:"Hello World!"
  });
  
    var marker = new google.maps.Marker({
      position: myLatlng, 
      map: map, 
      title:"Hello World!"
  });
  */

