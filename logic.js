var map = L.map('mapid').setView([51.505, -0.09], 5);
  // Create the tile layer that will be the background of our map.
var earthquakemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    

}).addTo(map);


var geoData= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";


function createFeatures(earthquakeData) {
  // Color conditional formatting of the markers depending on depth
      function magcolor(depth){
        if (depth <= 10 ) return "yellow";
        else if (depth <= 30) return "red";
        else if (depth <= 50) return "orange";
        else if (depth <= 70) return "green";
        else if (depth <= 90) return "purple";
        else return "black";
      }

d3.json(geoData).then(function(data) {
  L.geoJson(data, {
    style: function(feature) {
      return {
        // Using default opacity and fill opacity
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 1.5,
          fillColor: magcolor(data.geometry.coordinates[2]),
          color: "#000000",
          // Making sure the radius will scale
          radius: data.properties.mag * 7,
      }
  }
  })
  console.log(data.features);
  createFeatures(data.features);
});






  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend");
         depth = [-80.154,32.944,6.75],
         colors = [];
        labels = [];
  }

 

 
    
        
    
    // Creating a popup on the map that displays earthquake data
        function onEachFeature(feature, layer) {
          layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}
          </p><hr><p>Magnitude: ${feature.properties.mag} | Depth: ${feature.geometry.coordinates[2]}</p>`);
        }
    
    
        var earthquakes = L.geoJSON(earthquakeData, {
            pointToLayer: function (feature, latlong) {
                return L.circleMarker(latlong)
            },
          onEachFeature: onEachFeature,
          style: style
        });
        
    
        createMap(earthquakes);
      
    }
function createMap(Earthquakes) {

  
  
  
    // Create a baseMaps object to hold the earthquakemaplayer.
    var baseMaps = {
      "Earthquake": earthquakemap
    };
  
    // Create an overlayMaps object to hold the earthquakemap layer.
    var overlayMaps = {
      "EARTHQUAKES": Earthquakes
    };
  
   // Create the map object with options.
   var map = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 5,
    layers: [earthquakemap, Earthquakes]
  });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
    
    legend.addTo(map);

  }