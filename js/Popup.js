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
			declare, lang,parser,
			Map,
			Popup, PopupTemplate,
			FeatureLayer,
			SimpleFillSymbol, Color,
			domClass, domConstruct, on,
			Chart, theme
		) {
            return declare(null, {
                map: null,
                constructor: function(/*Object*/ kwArgs) {
					parser.parse();
                    lang.mixin(this, kwArgs);
                },
				//Configure pop up template
                configurePopupTemplate: function() {					
					var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
					var popup = new Popup({
						fillSymbol: fill,
						titleInBody: false
					}, domConstruct.create("div"));
					domClass.add(popup.domNode, "dark");
                },
				
				//Define pop up for parking areas
                showPopUp: function(myTitle, myFieldInfos) {					
					//Define pop up for parking areas
					var popUp = new PopupTemplate({
						title: myTitle,
						fieldInfos: myFieldInfos
					});
					return popUp;
                }
            });
        });

