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
    "esri/dijit/Popup", "esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol", "esri/Color",
    "dojo/dom-class", "dojo/dom-construct", "dojo/on",
    "dojox/charting/Chart", "dojox/charting/themes/Dollar",
    "dojo/domReady!"
],
        function(
                declare, lang, parser,
                Map,
                Popup, PopupTemplate,
                FeatureLayer,
                SimpleFillSymbol, Color,
                domClass, domConstruct, on,
                Chart, theme
                ) {
            return declare(null, {
                map: null,
                layerArr: null,
                infoTemplate: null,
                constructor: function(/*Object*/ kwArgs) {
                    parser.parse();
                    lang.mixin(this, kwArgs);
                },
                //create the layer objects
                createLayerObjects: function() {

                    //Initialize buildings feature layers
                    var buildingLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/0", {
                        mode: FeatureLayer.MODE_ONDEMAND,
                        outFields: ["*"],
                        /**/infoTemplate: this.infoTemplate['building'],
                        id: "buildingLayer"
                    });
                    this.layerArr.push(buildingLayer);

                    //Initialize parcels feature layers
                    var parcelLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/NCRS/JOS3/MapServer/1", {
                        mode: FeatureLayer.MODE_ONDEMAND,
                        outFields: ["*"],
                        /**/infoTemplate: this.infoTemplate['parcel'],
                        id: "parcelLayer"
                    });
                    this.layerArr.push(parcelLayer);
                },
                //Add layers to the map
                addLayersToMap: function() {
                    //Add feature layers to map
                    this.map.addLayers(this.layerArr);
                    //this.map.addLayers(parkingLayer);
                },
                //Get the map layers
                getMapLayers: function() {
                    return this.layerArr;
                }
            });
        });

