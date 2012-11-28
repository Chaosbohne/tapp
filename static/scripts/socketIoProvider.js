
SocketIoProviderClient = function(url, port) {
  //SocketIoProviderClient.prototype.socketIoClient = io.connect(url + ':' + port);
  SocketIoProviderClient.prototype.socketIoClient = io.connect('http://tapp.nodester.com:80');
  //SocketIoProviderClient.prototype.socketIoClient = new io.Socket(null, {port: 8000, rememberTransport: false}); 
  SocketIoProviderClient.prototype.markersArray = [];
  
  this.socketIoClient.on('all', function(data){
    console.log(data);
  });

  var _this = this;
  this.socketIoClient.on('stationsRes', function(data){
    if(_this.get('map')) {
        if(_this.markersArray) {
        for(var i = _this.markersArray.length - 1; i >= 0; i--) {
          _this.markersArray[i].setMap(null);
          _this.markersArray.pop();
          $('ul#nav li').remove()
        }
      }
      for(var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var marker = new google.maps.Marker({
          draggable: false,
          map:_this.get('map'),
          position: new google.maps.LatLng(data[i].latLng.latitude, data[i].latLng.longitude),
          title: 'Tankstelle'
        });
        marker.set('id', data[i]._id);
        _this.markersArray.push(marker);
        $('ul#nav').append('<li id=' + data[i]._id + '>' + data[i].name + '</li>');
      }
    }
    
    $('ul#nav li').click(function() {
     var pinColor = "088A08";
     var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));   
        
      for(var i = 0; i < _this.markersArray.length; i++) {
        if(_this.markersArray[i].get('id') == this.id){
          _this.markersArray[i].setIcon(pinImage);
        }else{
         _this.markersArray[i].setIcon();
        }
      }
    });

  });
  
  SocketIoProviderClient.prototype.setMapProvider = function(mapProviderr) {
    this.mapProvider = mapProviderr;
    console.log(this.mapProvider);
  }
  
  SocketIoProviderClient.prototype.send = function(event, message){
    this.socketIoClient.emit(event, message);
  }
};
SocketIoProviderClient.prototype = new google.maps.MVCObject();
  /*
  function initSocket(){
    console.log('starting socket');
    socket = io.connect('http://localhost:8000');
   
    socket.on('all', function (data) {
      //console.log(data);
      for(var i  = 0; i < data.length; i++) {
        console.log(i);
        console.log(data[i]);
        console.log(data[i].latLng);
        console.log(data[i].name);
      
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i].latLng.latitude,data[i].latLng.longitude),
          title:data[i].name
        });
        
        console.log(marker);
        marker.setMap(map);
      }
    });
  }  
  */