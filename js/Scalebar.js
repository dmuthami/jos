/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
	"dojo/parser",
    "esri/dijit/Scalebar"
],
        function(
                declare, lang, parser,
                Scalebar
                ) {
            return declare(null, {
                map: null,
				scalebarUnit: null,
                constructor: function(/*Object*/ kwArgs) {
                    parser.parse();
                    lang.mixin(this, kwArgs);
                },
                //create the layer objects
                showScaleBar: function() {
					var scalebar = new Scalebar({
					  map: this.map,
					  // "dual" displays both miles and kilmometers
					  // "english" is the default, which displays miles
					  // use "metric" for kilometers
					  scalebarUnit: this.scalebarUnit
					});

                }
            });
        });

