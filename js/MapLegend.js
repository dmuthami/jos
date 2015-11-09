/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/dijit/Legend",
    "dojo/_base/array",
    "dojo/parser",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/AccordionContainer",
    "dojo/domReady!"
],
        function(
                declare, lang,
                Map,
                FeatureLayer,
                Legend,
                arrayUtils,
                parse
                ) {
            return declare(null, {
                map: null,
                evt: null,
                constructor: function(/*Object*/ kwArgs) {
                    lang.mixin(this, kwArgs);
                    parser.parse();
                },
                //create the layer objects
                createLegend: function() {
                    var layerInfo = arrayUtils.map(this.evt.layers, function(layer, index) {
                        return {layer: layer.layer, title: layer.layer.name};
                    });
                    if (layerInfo.length > 0) {
                        var legendDijit = new Legend({
                            map: this.map,
                            layerInfos: layerInfo
                        }, "legendDiv");
                        legendDijit.startup();
                    }

                }
            });
        });

