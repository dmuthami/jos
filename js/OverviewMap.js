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
					try {
						lang.mixin(this, kwArgs);	
					}
					catch(err){
						console.log("constructor: function (OverviewMap.js) "+err.message);
					}				
                },
                loadOverViewMap: function() {
					try {
						var overviewMapDijit = new OverviewMap({
							map: this.map,
							visible: this.visible
						});
						overviewMapDijit.startup();	
					}
					catch(err){
						console.log("loadOverViewMap: function (OverviewMap.js) "+err.message);
					}					
                }
            });
        });

