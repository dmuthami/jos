/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/map",
    "esri/dijit/OverviewMap",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
],
        function(declare, lang, map, OverviewMap, BorderContainer, ContentPane, domReady) {
            return declare(null, {
                map: null,
                visible: null,
                constructor: function(/*Object*/ kwArgs) {
                    lang.mixin(this, kwArgs);
                },
                loadOverViewMap: function() {
                    var overviewMapDijit = new OverviewMap({
                        map: this.map,
                        visible: this.visible
                    });
                    overviewMapDijit.startup();
                }
            });
        });

