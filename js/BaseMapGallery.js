/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/map",
    "esri/dijit/BasemapGallery",
    "esri/arcgis/utils",
    "dojo/parser",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dojo/domReady!"
],
        function(
                declare,
                lang,
                map,
                BasemapGallery,
                arcgisUtils,
                parser,
                domReady
                ) {
            return declare(null, {
                map: null,
                showArcGISBasemaps: null,
                constructor: function(/*Object*/ kwArgs) {
					try {
						parser.parse();
						lang.mixin(this, kwArgs);	
					}
					catch(err){
						console.log("constructor: function (BasemapGallery.js) "+err.message);
					}					
                },
                showBasemapGallery: function() {
					try {
						//add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
						var basemapGallery = new BasemapGallery({
							map: this.map,
							showArcGISBasemaps: this.showArcGISBasemaps
						}, "basemapGallery");
						basemapGallery.startup();	
					}
					catch(err){
						console.log("showBasemapGallery: function (BasemapGallery.js) "+err.message);
					}					

                }
            });
        });

