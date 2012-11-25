    /* A LOT OF WIDGET FUN
    https://developers.google.com/maps/articles/mvcfun?hl=de-DE
    https://google-developers.appspot.com/maps/articles/mvcfun/step6?hl=de-DE
    view-source:https://google-developers.appspot.com/maps/articles/mvcfun/step6?hl=de-DE
    
    
    MORE COMPLEX SOURCE OF WIDGET - VERY INTERESSTING  
    http://code.google.com/p/psycho-geo/source/browse/geo-search/distancewidget.js?spec=svn2aeca411d886fb7b8eaf4d14de86a30e6c60ed14&r=3e9381d607a1612072933defa0c9813a0aa555bc
    */



      /**
       * A distance widget that will display a circle that can be resized and will
       * provide the radius in km.
       *
       * @param {google.maps.Map} map The map to attach to.
       *
       * @constructor
       */
      DistanceWidget = function(map, mapProvider) {
        DistanceWidget.prototype.mapProvider = mapProvider;
        DistanceWidget.prototype.radiusWidget = null;
        this.set('map', map);
        this.set('position', map.getCenter());
        this.set('distance', 1);

        var pinColor = "0000FF";
        var pinText = "A";
        var pinTextColor = "000000";   
        var pinImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + pinText + '|' + pinColor + '|' + pinTextColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));        
        var marker = new google.maps.Marker({
          draggable: true,
          title: 'Move me!',
          icon: pinImage
        });

        // Bind the marker map property to the DistanceWidget map property
        marker.bindTo('map', this);

        // Bind the marker position property to the DistanceWidget position
        // property
        marker.bindTo('position', this);

        // Create a new radius widget
        radiusWidget = new RadiusWidget(mapProvider);

        // Bind the radiusWidget map to the DistanceWidget map
        radiusWidget.bindTo('map', this);

        // Bind the radiusWidget center to the DistanceWidget position
        radiusWidget.bindTo('center', this, 'position');

        // Bind to the radiusWidgets' distance property
        this.bindTo('distance', radiusWidget);

        // Bind to the radiusWidgets' bounds property
        this.bindTo('bounds', radiusWidget);
      
        this.bindTo('distance', radiusWidget, 'distance');
        
        var _this = this;
        google.maps.event.addListener(marker, 'dblclick', function() {
          // When a user double clicks on the icon fit to the map to the bounds
          _this.get('map').fitBounds(_this.get('bounds'));
        });
        
        google.maps.event.addListener(marker, 'dragend', function() {
          _this.mapProvider.showMap(_this.get('position'));
        });
        
      }
      DistanceWidget.prototype = new google.maps.MVCObject();