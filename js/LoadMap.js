require([
	"esri/map", 
	"esri/layers/ArcGISDynamicMapServiceLayer",
	"dojo/domReady!"], 
	function(Map,ArcGISDynamicMapServiceLayer) { 
		//Specify extent
		var extentInitial = new esri.geometry.Extent({
"xmin":987167.4997028265,"ymin":1097717.2069050553,"xmax":987485.19110161,"ymax":1098028.9266610045,
			"spatialReference" : {
				"wkid" : 102100  
			}
		});

		
		

	  var map = new Map("map", {
		extent : extentInitial,
		basemap: "topo"
	  });
	  
	  //Load our map
	   var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services//NCRS/JOS3/MapServer", {
          "opacity" : 1
        });

        map.addLayer(dynamicMapServiceLayer);
});