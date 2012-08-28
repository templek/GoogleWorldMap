/*
* Project: Google Maps
* Description: Advanced Google Maps
* Author: Lee Boonstra
*/

;(function ( $, window, undefined ) {

    // Create the defaults once
    var pluginName = 'GoogleMaps',
        document = window.document,
        defaults = {
            data: [], //bind static marker addresses.
            //eventCallback: null, //bind a function with marker events
            imageMarker: 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png',
            kml: null, //point to an example kml file
            mapType: 'roadmap', //default map type
            mouseEvent: null, //'click' 
            startPos: { lat: '52.231164', lng: '5.103149' }, //center on Utrecht
            streetview: false,
            styling: null, //point to styling object: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
            zoom: 2
        };

    // The actual plugin constructor
    function GoogleMaps( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.arrMarkers = new Array();
        this.init();

    }
        
    GoogleMaps.prototype.init = function () {
        var mapOptions = this.getMapOptions();

        this.map = new google.maps.Map(this.element, mapOptions);
        this.setData();
        this.setKML();

        /*  
        google.maps.event.addListenerOnce(this.map, 'tilesloaded', function() { 
            allowedBounds = this.getBounds();            
            google.maps.event.addListener(this.map,'center_changed',function() { checkBounds(allowedBounds); });
        });
        */
        
       //  $('div.heineken').eq(0).css('backgroundColor': '#ff000');

    };

    /*
     * Map Styling Functions
     */
    GoogleMaps.prototype.getMapType = function() {
        var mapType = null;

        switch(this.options.mapType){
            case "satellite":
              mapType = google.maps.MapTypeId.SATELLITE;
              break;
            case "hybrid":
              mapType = google.maps.MapTypeId.HYBRID;
              break;
            case "terrain":
              mapType = google.maps.MapTypeId.TERRAIN;
              break; 
            default:
              mapType = google.maps.MapTypeId.ROADMAP;
        }
        return mapType;
    }

    GoogleMaps.prototype.getMapOptions = function(){
        return {
                backgroundColor: 'transparent',
                center: new google.maps.LatLng(this.options.startPos.lat, this.options.startPos.lng),
                mapTypeId: this.getMapType(),
                rotateControl: false,
                panControl: false,
                scaleControl: false,
                streetViewControl: this.options.streetview,
                zoomControl: false,
                mapTypeControl: false,
                kml: this.options.kml,
                styles: this.options.styling,
                minZoom: this.options.minZoom,
                maxZoom: this.options.maxZoom,
                zoom: this.options.zoom
        };  
    }
    
    /*
     * Map KML Functions
     */
    GoogleMaps.prototype.setKML = function(){
        var that = this;
        console.log(that.options.kml);
        url_end = "?nocache=" + (new Date()).valueOf();
        var layer = new google.maps.KmlLayer(that.options.kml + url_end);
        layer.setMap(this.map);
        
        
        console.log(layer);
        
        google.maps.event.addListener(layer, 'click', function(kmlEvent) {
          //var text = kmlEvent.featureData.description;
          //console.log(text);
          console.log(kmlEvent);
        });
        
    };    

    /*
     * Map Data Functions
     */
    GoogleMaps.prototype.setData = function(){
        var self = this;
        var i = 0;

        for(i; i < this.options.data.length; i++){
            self.setMarker(this.options.data[i]);
        }
    };
    GoogleMaps.prototype.setMarker = function(item){
        var pos = item.position.split(',');
        pos = new google.maps.LatLng(pos[0], pos[1]);

        var tab1 = "<div class='main'><div class='pic'><img src='"+item.image+"' alt='"+item.name+"'/></div><h1>"+item.name+"</h1><p>"+item.place+"</p><span class='date'>"+item.date+"</span></div>";
        var tab2 = "<div class='desc'>"+item.description+"</div>";

        var infoBubble = new InfoBubble({            
            arrowSize: 5,
            arrowPosition: 35,
            borderRadius: 0,
            borderColor: '#081101',
            maxWidth: 300
        }); 

        infoBubble.addTab('About', tab1);
        infoBubble.addTab('Info', tab2);    

        var googleMarker = new google.maps.Marker({
             draggable: false,
             icon: this.options.imageMarker,
             map: this.map,
             position: pos,
             title: item.name
        }); 

        google.maps.event.addListener(googleMarker, this.options.mouseEvent, function() {
            if (!infoBubble.isOpen()) {
                infoBubble.open(this.map, googleMarker);
            }
        });
 
        return googleMarker;     
    };   


    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {        
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new GoogleMaps( this, options ));
            }
        });
    };

}(jQuery, window));