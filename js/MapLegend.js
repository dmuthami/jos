/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/connect",
    "dojo/dom",
    "dojo/_base/array",
    "dojo/parser",
    "dojo/on",
    "dojo/_base/Color",
    "esri/map",
    "esri/geometry/Extent",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/renderers/ClassBreaksRenderer",
    "agsjs/dijit/TOC",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/fx",
    "dojo/domReady!"
],
        function(
                declare, lang, arrayUtils,
                connect, dom,
                parser, on, Color, Map,
                Extent, FeatureLayer, ArcGISTiledMapServiceLayer,
                ArcGISDynamicMapServiceLayer, SimpleFillSymbol,
                ClassBreaksRenderer, TOC
                ) {
            return declare(null, {
                map: null,
                layerArr: null,
                constructor: function(/*Object*/ kwArgs) {
                    lang.mixin(this, kwArgs);
                    parser.parse();
                },
                //create the layer objects
                createLegend: function() {
                    //Add the legend
                    var mapp = this.map;
                    myArr = this.layerArr[0];
                    mapp.on('layers-add-result', function(evt) {
                        // overwrite the default visibility of service.
                        // TOC will honor the overwritten value.
                        /***
                         * Change default visible layers 
                         * dynaLayer1.setVisibleLayers([2, 5, 8, 11]);
                         */

                        //try {
                        try {
                            toc = new TOC({
                                map: mapp,
                                layerInfos: [
                                    {
                                        layer: myArr[0],
                                        title: "Building"
                                                //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                                //slider: false // whether to display a transparency slider.
                                    }, {
                                        layer: myArr[1],
                                        title: "Parcel"
                                                //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                                //slider: false // whether to display a transparency slider.
                                    }]
                            }, 'tocDiv');

                            toc.startup();
                            toc.on('load', function() {
                                if (console)
                                    console.log('TOC loaded');
                            });
                        }
                        catch (err) {
                            console.log(err.message);
                        }
                    });
                }
            });
        });

