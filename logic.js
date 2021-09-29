var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

var geojson;

d3.json(geoData, function(data) {
    console.log(data.features);
    createFeatures(data.features);
});

function createMap(Earthquakes) {

    // Create the tile layer that will be the background of our map.
    var earthquakemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   
    });
  
  
    // Create a baseMaps object to hold the earthquakemaplayer.
    var baseMaps = {
      "Earthquake": earthquakemap
    };
  
    // Create an overlayMaps object to hold the earthquakemap layer.
    var overlayMaps = {
      "EARTHQUAKES": Earthquakes
    };
  
    // Create the map object with options.
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [earthquakemap, Earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
//   });