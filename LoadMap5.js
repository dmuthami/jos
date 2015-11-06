var map,dialog;
require([
    "esri/map",
    /*custom classes*/
    "js/MapLayers",
    "js/BaseMapGallery",
    "js/HomeButton",
    "js/LocateButton",
    "js/Measurement",
    "js/OverviewMap",
    "js/Popup",
    "js/MapLegend",
    "agsjs/dijit/TOC",
    /*end of custom classes*/
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/domReady!",
	 /*aaded */
	 "esri/layers/FeatureLayer",  "esri/tasks/query", "esri/tasks/QueryTask",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", 
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/lang",
        "esri/Color", "dojo/number", "dojo/dom-style", "dojo/dom","dojo/on",
        "dijit/TooltipDialog", "dijit/popup", "dojo/domReady!"
	
	],
        function(Map,
                /*custom classes*/
                MapLayers,
                BaseMapGallery,
                HomeButton,
                LocateButton,
                Measurement,
                OverviewMap,
				FeatureLayer,
                Popup,
                MapLegend,
                TOC,
                /*end of custom classes*/
                ArcGISDynamicMapServiceLayer,
				QueryTask,Query,
                SimpleFillSymbol, SimpleLineSymbol,
                SimpleRenderer, Graphic, esriLang,
                Color, number, domStyle, 
                TooltipDialog, dijitPopup,on,dom
				
				) {

            //Specify extent
            var extentInitial = new esri.geometry.Extent({
                "xmin": 987167.4997028265,
                "ymin": 1097717.2069050553,
                "xmax": 987485.19110161,
                "ymax": 1098028.9266610045,
                "spatialReference": {
                    "wkid": 102100
                }
            });

            //Create Map Object
              map = new Map("map", {
                extent: extentInitial,
                basemap: "topo"
            });

            /*Popup*/
            var popup = new Popup(
                    {map: map});
            popup.configurePopupTemplate();

            //Define key value pair object for Popups
            var popUpObject = {};

            //Define pop up for building areas
            var title = "Building";
            fieldInfos = [
                {
                    fieldName: "LRNO",
                    label: "LR NO:",
                    visible: true
                }, {
                    fieldName: "TYPE",
                    label: "Type:",
                    visible: true
                }, {
                    fieldName: "TAX_CODE",
                    label: "Tax Code:",
                    visible: true
                }, {
                    fieldName: "PROPERTY_V",
                    label: "Property Value:",
                    visible: true
                }, {
                    fieldName: "TAX_VALUE",
                    label: "Tax Value:",
                    visible: true
                }, {
                    fieldName: "OWNER",
                    label: "Owner:",
                    visible: true
                }, {
                    fieldName: "ADDRESS",
                    label: "Address:",
                    visible: true
                }, {
                    fieldName: "OCCUPATION",
                    label: "Occupation:",
                    visible: true
                }, {
                    fieldName: "GENDER",
                    label: "Gender:",
                    visible: true
                }, {
                    fieldName: "TELEPHONE",
                    label: "Telephone:",
                    visible: true
                }, {
                    fieldName: "PAYMENT_DA",
                    label: "Payment DA:",
                    visible: true
                }, {
                    fieldName: "PAYMENT_ST",
                    label: "Payment ST:",
                    visible: true
                }, {
                    fieldName: "BUILDING_N",
                    label: "Building No:",
                    visible: true
                }
            ]
            var buildingTemplate = popup.showPopUp(title, fieldInfos);
            popUpObject['building'] = buildingTemplate

            //Define pop up for parcels layer
            var title = "Parcel";
            fieldInfos = [
                {
                    fieldName: "LRNO",
                    label: "LR NO:",
                    visible: true
                }, {
                    fieldName: "LAND_USE",
                    label: "Landuse:",
                    visible: true
                }, {
                    fieldName: "TAX_CODE",
                    label: "Tax Code:",
                    visible: true
                }, {
                    fieldName: "OWNER",
                    label: "Owner:",
                    visible: true
                }, {
                    fieldName: "ADDRESS",
                    label: "Address:",
                    visible: true
                }, {
                    fieldName: "OCCUPATION",
                    label: "Occupation:",
                    visible: true
                }, {
                    fieldName: "TRIBE",
                    label: "Tribe:",
                    visible: true
                }, {
                    fieldName: "GENDER",
                    label: "Gender:",
                    visible: true
                }, {
                    fieldName: "TELEPHONE",
                    label: "Telephone:",
                    visible: true
                }, {
                    fieldName: "PAYMENT",
                    label: "Payment:",
                    visible: true
                }, {
                    fieldName: "PAYMENT_DA",
                    label: "Payment DA:",
                    visible: true
                }
            ]
            var parcelTemplate = popup.showPopUp(title, fieldInfos);
            popUpObject['parcel'] = parcelTemplate

            /*Layers*/
            var mapLayers = new MapLayers(
                    {map: map,
                        layerArr: new Array()
                                /**/, infoTemplate: popUpObject
                    }
            );
            mapLayers.createLayerObjects(); //Create layer objects
            mapLayers.addLayersToMap(); // Add the layer objects to the map objects

            /*Basemap Gallery*/
            var baseMapGallery = new BaseMapGallery(
                    {
                        map: map,
                        showArcGISBasemaps: true
                    }
            );
            baseMapGallery.showBasemapGallery();

            /*Home Button*/
            var homeButton = new HomeButton(
                    {map: map});
            homeButton.showHomeButton();

            /*Locate Button*/
            var locateButton = new LocateButton(
                    {map: map}
            );
            locateButton.showLocateButton();

            /*Measurement Gallery*/
            var measurement = new Measurement(
                    {map: map,
                        defaultAreaUnit: esri.Units.ACRES,
                        defaultLengthUnit: esri.Units.METERS
                    }
            );
            measurement.showMeasurement();

            /* Overview Map*/
            var overviewMap = new OverviewMap(
                    {
                        map: map,
                        visible: true
                    }
            );
            overviewMap.loadOverViewMap();

            /* Overview Map*/

            /*
             var mapLegend = new MapLegend(
             {
             map: map,
             layerArr: mapLayers.getMapLayers()
             }
             );
             mapLegend.createLegend();
             */

            arr = mapLayers.getMapLayers();
            map.on('layers-add-result', function(evt) {
                // overwrite the default visibility of service.
                // TOC will honor the overwritten value.
                /***
                 * Change default visible layers 
                 * dynaLayer1.setVisibleLayers([2, 5, 8, 11]);
                 */

                //try {
                try {
                    toc = new TOC({
                        map: map,
                        layerInfos: [
                            {
                                layer: arr[0],
                                title: "Building"
                                        //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                        //slider: false // whether to display a transparency slider.
                            }, {
                                layer: arr[1],
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
			 // using feature layer
			// var search1=document.getElementById('search');
			// on(search1,'click',function(evt){
  
        var josbuildings = new FeatureLayer("http://localhost:6080/arcgis/rest/services/propertyTax/josmap/MapServer/0", {
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["LRNO","BUILDING_N","OWNER", "PROPERTY_V", "PAYMENT_ST"]
        });
        josbuildings.setDefinitionExpression("PAYMENT_ST = 'NOT PAID'");

        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, 
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, 
            new Color([30,0,255,0.35]), 
            1
          ),
          new Color([0,255,60,0.35])
        );
        josbuildings.setRenderer(new SimpleRenderer(symbol));
        map.addLayer(josbuildings);

        map.infoWindow.resize(245,125);
        
        dialog = new TooltipDialog({
          id: "tooltipDialog",
          style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
        });
        dialog.startup();
        
        var highlightSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, 
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, 
            new Color([255,0,0]), 3
          ), 
          new Color([125,125,125,0.35])
        );
		//when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
        josbuildings.on("mouse-over", function(evt){
          var t = "<b>${OWNER}</b><hr><b>Building NO: </b>${BUILDING_N}<br>"
            + "<b>Value: </b>${PROPERTY_V}<br>";
            
  
          var content = esriLang.substitute(evt.graphic.attributes,t);
          var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
          map.graphics.add(highlightGraphic);
          
          dialog.setContent(content);

          domStyle.set(dialog.domNode, "opacity", 0.85);
          dijitPopup.open({
            popup: dialog, 
            x: evt.pageX,
            y: evt.pageY
          });
        });
     //});
			
			
        });


