
MapProvider = function(mapID, mapSearchID, geoLocateProvider, socketIoProviderClient) {
  MapProvider.prototype.mapDiv = document.getElementById(mapID);
  MapProvider.prototype.inputField = document.getElementById(mapSearchID);
  MapProvider.prototype.autocomplete = null;
  MapProvider.prototype.geoLocateProvider = geoLocateProvider;
  MapProvider.prototype.socketIoProviderClient = socketIoProviderClient;
  MapProvider.prototype.distanceWidget = null;
  
  var _this = this;
  
  function createBindings(results) { 
        var myOptions = { mapTypeId: google.maps.MapTypeId.ROADMAP, center: results[0].geometry.location};
        _this.set('map', new google.maps.Map(_this.mapDiv, myOptions));
        _this.set('position_name', results[0].address_components[0].long_name);
        _this.set('position', results[0].geometry.location);
       
        _this.distanceWidget = new DistanceWidget(geoLocateProvider);
        _this.distanceWidget.bindTo('map', _this);
        _this.distanceWidget.bindTo('position', _this); 
        _this.bindTo('radius', _this.distanceWidget, 'distance');
        _this.get('map').fitBounds(_this.distanceWidget.get('bounds'));
        
        _this.initAutocomplete();
        _this.initAutocompleteHandler();
        _this.socketIoProviderClient.bindTo('map', _this);
        
        google.maps.event.addListener(_this.distanceWidget.marker, 'dragend', function() {
          _this.geoLocateProvider.geoLocationCodeLatLng( _this.get('position'), function(error, results) {
            if(results) {
            
              var index = results.formatted_address.indexOf(', Deutschland');
              var address;
                if(index != -1) {
                address = results.formatted_address.substring(0, index);
              }else {
                address = results.formatted_address;
              }

              _this.setBindings(_this.get('position'), address);
            }
          });
        });        
        
        google.maps.event.addListener(_this.distanceWidget.radiusWidget.sizer, 'dragend', function() {
          var mySpot = {
            longitude: _this.get('position').ab,
            latitude: _this.get('position').$a,
            radius: _this.get('radius')/(6371)
          };   
          _this.socketIoProviderClient.send('stations', mySpot);        
        });
  }
  
  geoLocateProvider.ipLocationPackage( function(error, results) {
    if(results) {
      if(results[0].geometry.location) {
        createBindings(results);
      }
    }else {
      geoLocateProvider.defaultLocationPackage( function (error, results) {
        if(results) {
          if(results[0].geometry.location) {
            createBindings(results);
          }
        }
      });
    }
  });
    
  MapProvider.prototype.radius_changed = function() {
    $('span#posBspanValue').text(this.get('radius'));
  };
  
  MapProvider.prototype.position_name_changed = function() {
    console.log('position_name_changed changed');
    $('span#posAspanValue').text(this.get('position_name'));
  };

  MapProvider.prototype.initAutocomplete = function() {  
    var myOptions = {
      types: ['geocode']
    };
  
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField, myOptions);
    this.autocomplete.bindTo('bounds', this.get('map'));
  }
  
  MapProvider.prototype.initAutocompleteHandler = function() {
    var _this = this;
    
    google.maps.event.addListener(_this.autocomplete, 'place_changed', function() {
      console.log('listener');
        var place = _this.autocomplete.getPlace();
        if(place.geometry) {
          if (place.geometry.location) {
            _this.setBindings(place.geometry.location, place.name);
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
      if(firstResult.length == 0) {
        firstResult = $('#searchLocation').val();
      }
      _this.geoLocateProvider.geoLocateAdress(firstResult, function(error, results) {
        if(results) {
          _this.setBindings(results[0].geometry.location, results[0].address_components[0].long_name);
        }else {
          console.log('focusin-handler: no address found');
        }
      });
    };
  }
  
  MapProvider.prototype.setBindings = function(position, position_name) {
    _this.set('position', position);
    _this.set('position_name', position_name);
    _this.get('map').fitBounds(_this.distanceWidget.get('bounds'));
      
    var mySpot = {
      longitude: position.ab,
      latitude: position.$a,
      radius: _this.get('radius')/(6371)
    };              
    _this.socketIoProviderClient.send('stations', mySpot);    
  }  
};
MapProvider.prototype = new google.maps.MVCObject();


