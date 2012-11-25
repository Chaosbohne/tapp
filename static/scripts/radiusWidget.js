      /**
       * A radius widget that add a circle to a map and centers on a marker.
       *
       * @constructor
       */
      RadiusWidget = function(mapProvider) {
        RadiusWidget.prototype.mapProvider = mapProvider;
      
        var circle = new google.maps.Circle({
          strokeWeight: 2
        });

        
        // Set the distance property value, default to 50km.
        this.set('distance', 1);

        // Bind the RadiusWidget bounds property to the circle bounds property.
        this.bindTo('bounds', circle);

        // Bind the circle center to the RadiusWidget center property
        circle.bindTo('center', this);

        // Bind the circle map to the RadiusWidget map
        circle.bindTo('map', this);

        // Bind the circle radius property to the RadiusWidget radius property
        circle.bindTo('radius', this);

        // Add the sizer marker
        this.addSizer_();
        
      }
      RadiusWidget.prototype = new google.maps.MVCObject();


      /**
       * Update the radius when the distance has changed.
       */
      RadiusWidget.prototype.distance_changed = function() {
        this.set('radius', this.get('distance') * 1000);
      };


      /**
       * Add the sizer marker to the map.
       *
       * @private
       */
      RadiusWidget.prototype.addSizer_ = function() {
        var pinColor = "0000FF";
        var pinText = "B";
        var pinTextColor = "000000"; 
        var pinImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + pinText + '|' + pinColor + '|' + pinTextColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));  
      
        var sizer = new google.maps.Marker({
          draggable: true,
          title: 'Drag me!',
          icon: pinImage
        });

        sizer.bindTo('map', this);
        sizer.bindTo('position', this, 'sizer_position');

        var _this = this;
        google.maps.event.addListener(sizer, 'drag', function() {
          // Set the circle distance (radius)
          _this.setDistance();
        });
        
        google.maps.event.addListener(sizer, 'dragend', function() {
          _this.mapProvider.showMap(_this.get('center'));
        });
      };


      /**
       * Update the center of the circle and position the sizer back on the line.
       *
       * Position is bound to the DistanceWidget so this is expected to change when
       * the position of the distance widget is changed.
       */
      RadiusWidget.prototype.center_changed = function() {
        var bounds = this.get('bounds');

        // Bounds might not always be set so check that it exists first.
        if (bounds) {
          var lng = bounds.getNorthEast().lng();

          // Put the sizer at center, right on the circle.
          var position = new google.maps.LatLng(this.get('center').lat(), lng);
          this.set('sizer_position', position);
        }
      };


      /**
       * Calculates the distance between two latlng points in km.
       * @see http://www.movable-type.co.uk/scripts/latlong.html
       *
       * @param {google.maps.LatLng} p1 The first lat lng point.
       * @param {google.maps.LatLng} p2 The second lat lng point.
       * @return {number} The distance between the two points in km.
       * @private
       */
      RadiusWidget.prototype.distanceBetweenPoints_ = function(p1, p2) {
        if (!p1 || !p2) {
          return 0;
        }

        var R = 6371; // Radius of the Earth in km
        var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
        var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
      };


      /**
       * Set the distance of the circle based on the position of the sizer.
       */
      RadiusWidget.prototype.setDistance = function() {
        // As the sizer is being dragged, its position changes.  Because the
        // RadiusWidget's sizer_position is bound to the sizer's position, it will
        // change as well.
        var pos = this.get('sizer_position');
        var center = this.get('center');
        var distance = this.distanceBetweenPoints_(center, pos);

        // Set the distance property for any objects that are bound to it
        this.set('distance', distance);
      };