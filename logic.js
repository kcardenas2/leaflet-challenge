var geoData= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";



d3.json(geoData).then(function(data) {


console.log(data.features);
createFeatures(data.features);
});



  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend"),
         depth = [-10, 30, 50, 70, 90];  

 
    //Create a loop o go through the density intervals and generate labels
    for (var i = 0; i < depth.length; i++)
    {
      div.innerHTML +=
        '<i style="background:' + magColor[i] + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
};

 
    
        
   // Create function to set color based on earthquake magColor

function magColor(depth)
{
  switch (true) {
    case depth >10:
      return "green";
    case depth > 30:
      return "#c7e9b4";
    case depth >50:
      return "#7fcdbb";
    case depth >70:
      return "#41b6c4";
    case depth >90:
      return "#2c7fb8";
    default:
      return "#253494";
  }
}


        function createFeatures(earthquakeData) {
          var earthquakes = L.geoJson(earthquakeData,{
            pointToLayer: function (features, latlng) {
              return L.circleMarker(latlng, {
                radius: features.properties.mag*5,
                fillColor: magColor(features.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.9})
                .bindPopup("<h3>" + "Location: " + features.properties.place +
                  "</h3><hr><p>" + "Date/Time: " + new Date (features.properties.time) + "<br>" +
                  "Magnitude: " + features.properties.mag + "</p>");
          }
        });
    
        createMap(earthquakes);
      
    }
function createMap(Earthquakes) {

    // Define base layer
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      
    })
    //create DARKMAP LAYER FROM MAPBOX
    var darkmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     
    });
  
  
    // Create a baseMaps object to hold the maplayers.
    var baseMaps = {
      "Dark": darkmap,
      "Light": streetmap
    };
  
    // Create an overlayMaps object to hold the earthquakemap layer.
    var overlayMaps = {
      "EARTHQUAKES": Earthquakes
    };
  
  //  Create the map object with options.
   var map = L.map("mapid", {
    center: [35.73, -118.0059],
    zoom: 6,
    layers: [streetmap, Earthquakes]
  });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
    
    legend.addTo(map);

  }