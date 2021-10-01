var geoData= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";



d3.json(geoData).then(function(data) {


console.log(data.features);
createFeatures(data.features);
});



  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend"),
         depth = [1, 2, 3, 4, 5];
        labels = [];  

 
    //Create a loop o go through the density intervals and generate labels
    for (var i = 0; i < depth.length; i++)
    {
      div.innerHTML +=
        '<i style="background:' + labels[i] + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
};

 
    
        
   // Create function to set color based on earthquake magColor

function magColor(depth)
{
  switch (true) {
    case 1:
      return "#ffffcc";
    case 2:
      return "#c7e9b4";
    case 3:
      return "#7fcdbb";
    case 4:
      return "#41b6c4";
    case 5:
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
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: api_key
    })
    //create DARKMAP LAYER FROM MAPBOX
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: api_key
    })
  
  
    // Create a baseMaps object to hold the maplayers.
    var baseMaps = {
      "Dark": darkmap,
      "Light": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakemap layer.
    var overlayMaps = {
      "EARTHQUAKES": Earthquakes
    };
  
  //  Create the map object with options.
   var map = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 5,
    layers: [lightmap, Earthquakes]
  });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
    
    legend.addTo(map);

  }