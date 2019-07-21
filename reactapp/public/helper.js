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

