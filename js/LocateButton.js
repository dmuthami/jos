/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/map",
    "esri/dijit/LocateButton",
    "dojo/domReady!"
],
        function(declare, lang, map, LocateButton, domReady) {
            return declare(null, {
                map: null,
                constructor: function(/*Object*/ kwArgs) {
					try {
						lang.mixin(this, kwArgs);	
					}
					catch(err){
						console.log("constructor: function (LocateButton.js) "+err.message);
					}					
                },
                showLocateButton: function() {
					try {
						//Create an instance of a locate button
						var geoLocate = new LocateButton({
							map: this.map
						}, "LocateButton");
						geoLocate.startup();	
					}
					catch(err){
						console.log("showLocateButton: function (LocateButton.js) "+err.message);
					}					
                }
            });
        });

