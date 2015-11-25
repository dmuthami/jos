/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/parser",
    "esri/map",
	"esri/layers/ArcGISImageServiceLayer", 
    "esri/layers/ImageServiceParameters", 
    "esri/dijit/Popup",
	"esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol", 
	"esri/Color",
    "dojo/dom-class",
	"dojo/dom-construct", 
	"dojo/on",
    "dojox/charting/Chart", 
	"dojox/charting/themes/Dollar",
    "dojo/domReady!"
],
        function(
                declare, 
				lang, 
				parser,
                Map,
				ArcGISImageServiceLayer, 
				ImageServiceParameters, 
                Popup, 
				PopupTemplate,
                FeatureLayer,
                SimpleFillSymbol, 
				Color,
                domClass,
				domConstruct, 
				on,
                Chart, 
				theme
                ) {
            return declare(null, {
                map: null,
                layerArr: null,
                infoTemplate: null,
                constructor: function(/*Object*/ kwArgs) {
					try {
						parser.parse();
						lang.mixin(this, kwArgs);	
					}
					catch(err){
						console.log("constructor: function (MapLayers.js) "+err.message);
					}					
                },
                //create the layer objects
                createLayerObjects: function() {
					try {
						//Initialize buildings feature layers
						/*
						 Public URL: http://54.225.91.55/arcgis/rest/services/Nairobi_County/Towns/MapServer/0
						 Private URL :  http://localhost:6080/arcgis/rest/services/NCRS/Towns/MapServer/0
						 */
						var url = "http://localhost:6080/arcgis/rest/services/NCRS/Towns/MapServer/0";
						var townsLayer = new FeatureLayer(url, {
							mode: FeatureLayer.MODE_ONDEMAND,
							outFields: ["*"],
							/**/infoTemplate: this.infoTemplate['towns'],
							id: "townsLayer"
						});

						//Initialize buildings feature layers
						/*
						 Public URL: http://54.225.91.55/arcgis/rest/services/Nairobi_County/JOS3/MapServer/0
						 Private URL :  http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/0
						 */
						var url = "http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/0";
						var buildingLayer = new FeatureLayer(url, {
							mode: FeatureLayer.MODE_ONDEMAND,
							outFields: ["*"],
							/**/infoTemplate: this.infoTemplate['building'],
							id: "buildingLayer"
						});
						
						//Initialize parcels feature layers
						/*
						 Public URL: http://54.225.91.55/arcgis/rest/services/Nairobi_County/JOS3/MapServer/1
						 Private URL :  http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/1
						 */
						url = "http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/1";
						var parcelLayer = new FeatureLayer(url, {
							mode: FeatureLayer.MODE_ONDEMAND,
							outFields: ["*"],
							/**/infoTemplate: this.infoTemplate['parcel'],
							id: "parcelLayer"
						});
											
						//Add quickbird image services
						/*
						 Public URL: http://54.225.91.55/arcgis/rest/services/Nairobi_County/quickbird/ImageServer
						 Private URL :  http://localhost:6080/arcgis/rest/services/NCRS/quickbird/ImageServer
						 */
						var params1 = new ImageServiceParameters();
						params1.noData = 0;
						url = "http://localhost:6080/arcgis/rest/services/NCRS/quickbird/ImageServer";
						var quickbirdImageServiceLayer = new ArcGISImageServiceLayer(url, {
						  imageServiceParameters: params1,
						  opacity: 1.0
						});
											
						//Add landsat image services
						/*
						 Public URL: http://54.225.91.55/arcgis/rest/services/Nairobi_County/nigsatx21/ImageServer
						 Private URL :  http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/1
						 */
						var params = new ImageServiceParameters();
						params.noData = 0;
						url = "http://localhost:6080/arcgis/rest/services/NCRS/nigsatx21/ImageServer";
						var landsatImageServiceLayer = new ArcGISImageServiceLayer(url, {
						  imageServiceParameters: params,
						  opacity: 1.0
						});
						
						
						//Add layers in a certain order, points lines, polygons then images
						this.layerArr.push(townsLayer);		
						this.layerArr.push(buildingLayer);	
						this.layerArr.push(parcelLayer);					
						this.layerArr.push(landsatImageServiceLayer);
						this.layerArr.push(quickbirdImageServiceLayer);	
					}
					catch(err){
						console.log("createLayerObjects: function (MapLayers.js) "+err.message);
					}					

					
                },
                //Add layers to the map
                addLayersToMap: function() {
					try {
						//Add feature layers to map
						this.map.addLayers(this.layerArr);
						//this.map.addLayers(parkingLayer);	
					}
					catch(err){
						console.log("addLayersToMap: function (MapLayers.js) "+err.message);
					}					

                },
                //Get the map layers
                getMapLayers: function() {
					try {
						return this.layerArr;	
					}
					catch(err){
						console.log("getMapLayers: function (MapLayers.js) "+err.message);
					}					
                }
            });
        });

