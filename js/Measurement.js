/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "esri/Color",
    "dojo/keys",
    "dojo/parser",
    "esri/config",
    "esri/sniff",
    "esri/map",
    "esri/SnappingManager",
    "esri/dijit/Measurement",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/tasks/GeometryService",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/dijit/Scalebar",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dijit/form/CheckBox",
    "dojo/domReady!"
],
        function(
                declare, lang, dom, Color, keys, parser,
                esriConfig, has, Map, SnappingManager, Measurement, FeatureLayer, SimpleRenderer, GeometryService, SimpleLineSymbol, SimpleFillSymbol
                ) {
            return declare(null, {
                map: null,
                defaultAreaUnit: null,
                defaultLengthUnit: null,
                constructor: function(/*Object*/ kwArgs) {
					try {
						parser.parse();
						lang.mixin(this, kwArgs);	
					}
					catch(err){
						console.log("constructor: function (Measurement.js) "+err.message);
					}					
                },
                showMeasurement: function() {
					try {
						//add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
						var measurement = new Measurement({
							map: this.map,
							defaultAreaUnit: this.defaultAreaUnit,
							defaultLengthUnit: this.defaultLengthUnit
						}, "measureDiv");
						measurement.startup();	
					}
					catch(err){
						console.log("showMeasurement: function (Measurement.js) "+err.message);
					}					

                }
            });
        });

