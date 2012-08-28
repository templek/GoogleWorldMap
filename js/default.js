$(document).ready(function() {
    loadGoogleMaps();
});

function loadGoogleMaps(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAH2M6UkHlkxCnmds7Hny6bmMwBDiflDh4&sensor=false&callback=createMapWithData";
    document.body.appendChild(script);          
}

function createMapWithData(){
		var googleMap = $("div.map").GoogleMaps({
			//data: response.events,
			imageMarker: '../img/marker.png',
            kml: 'http://www.ladysign-apps.com/kml/world-borders.kml',
            
			minZoom: 2,
			maxZoom: 5,
			mouseEvent: 'click',
			styling: [{
				    featureType: "administrative",
				    stylers: [
				      { visibility: "off" }
				    ]
				  },
                    {
                    featureType: "transit",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#808080" }
                    ]
                  },
                    {
                    featureType: "administrative.country",
                    elementType: "geometry",
                    stylers: [
                      { color: "#808080" }
                    ]
                  },
                  {
				    featureType: "landscape",
				    stylers: [
				      { hue: "#00ffb3" },
				      { visibility: "on" },
				      { lightness: -100 }
				    ]
				  },{
				    featureType: "poi",
				    stylers: [
				      { visibility: "off" }
				    ]
				  },{
				    featureType: "road",
				    stylers: [
				      { visibility: "off" }
				    ]
				  },{
				    featureType: "transit",
				    stylers: [
				      { visibility: "off" }
				    ]
				  },{
				    featureType: "water",
				    elementType: "labels",
				    stylers: [
				      { visibility: "off" }
				    ]
				  },{
				    featureType: "water",
				    elementType: "geometry",
				    stylers: [
				      { visibility: "on" },
				      { hue: "#22221" }
				    ]
				  },{
				  }
		], 
			zoom: 3
		});
}