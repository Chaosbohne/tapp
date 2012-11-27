
GeoLocateProvider = function() {
  this.geocoder = null;
  this.myCountry = 'de';  
  this.geocoder = new google.maps.Geocoder();
  
  GeoLocateProvider.prototype.ipLocationPackage = function(callback) {
    console.log('Using iplocationPackage');
    ipLocationCodeLatLng( function(addr) {
      if(addr) callback(null, addr);
      else callback(null);
    });      
  }
  
  GeoLocateProvider.prototype.defaultLocationPackage = function(callback) {
    console.log('Using defaultlocationPackage');
    myBounds = new google.maps.LatLngBounds();
    if(myBounds) {
     myBounds.extend(new google.maps.LatLng(47.2701115, 5.866342499999973));
     myBounds.extend(new google.maps.LatLng(55.058347, 15.041896199999996));  
    }
    
    this.geocoder.geocode({'region':'de', 'bounds':myBounds}, function(results, status){
      if(status == google.maps.GeocoderStatus.OK) {
        callback(null, results);
      }else {
        callback(null);
      }
    });  
  }
  
  GeoLocateProvider.prototype.geoLocationPackage = function(callback) {
    geoLocationGetPosition( function(error, position) {
      if(!error) {
        geoLocationCodeLatLng(position, function(error, results) {
          if(!error) {
            callback(null, results);
          }else {
            callback(null);
          }
        });
      }else {
        callback(null);
      }
    });
  }
  
  GeoLocateProvider.prototype.geoLocateAdress = function(address, callback) {
    this.geocoder.geocode({'region':'de', 'address':address}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        callback(null, results);
      }else {
        callback(null);
      }      
    });  
  }
};

  function geoLocationGetPosition(callback) {
    console.log('Using geolocationPackage');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          callback(null, position);
        }, function(error) {
          callback(null);
        }
      );
    } else {
      alert("Not Supported!");
    }
  }

  GeoLocateProvider.prototype.geoLocationCodeLatLng = function(position, callback) {
    var latLng = new google.maps.LatLng(position.$a, position.ab);
    this.geocoder.geocode({'latLng':latLng, 'region':'de'}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        callback(null, results[0]);
      }else {
        callback(null);
      }
    });  
  }

  function ipLocationCodeLatLng(callback){
    if(this.geocoder) {
      var city;
      var country;
      var latLng = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
      
      this.geocoder.geocode({'latLng': latLng, 'region':'de'}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          for(var i=0; i<results[0].address_components.length; i++) {
            for(var j=0; j<results[0].address_components[i].types.length;j++) {
              if(results[0].address_components[i].types[j] == 'locality') {
                city = results[0].address_components[i].long_name;
              } else if(results[0].address_components[i].types[j] == 'country') {
                country = results[0].address_components[i].short_name;
              }
            }          
          }
          
          if(city != null && country.toLowerCase() == this.myCountry) {
            this.geocoder.geocode({'address':city + ' '+ country}, function(results, status){
              if(status == google.maps.GeocoderStatus.OK) {
                console.log('calback null results');
                callback(results );
              }else {
                callback(null);
              }
            });
          }else {
            callback(null);
          }
        }else {
          callback(null);
        }
      });
    }else {
      callback(null);
    }
  }   

 