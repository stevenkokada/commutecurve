var platform = new H.service.Platform({
  apikey: 'gXnvo0LMAjE_uYRstf6KMNJ4f4ZT-ZYcXMWtBPT9bDs',
});
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();


//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,{
  center: {lat:50, lng:5},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


function addMarkersToMap(map) {
  var parisMarker = new H.map.Marker({ lat: 48.8567, lng: 2.3508 });
  map.addObject(parisMarker);

  var romeMarker = new H.map.Marker({ lat: 41.9, lng: 12.5 });
  map.addObject(romeMarker);

  var berlinMarker = new H.map.Marker({ lat: 52.5166, lng: 13.3833 });
  map.addObject(berlinMarker);

  var madridMarker = new H.map.Marker({ lat: 40.4, lng: -3.6833 });
  map.addObject(madridMarker);

  var londonMarker = new H.map.Marker({ lat: 51.5008, lng: -0.1224 });
  map.addObject(londonMarker);
}
