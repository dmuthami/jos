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
    "js/Scalebar",
    /*end of custom classes*/
    /*custom classes for Search*/
    "dojo/on",
    "esri/dijit/Search",
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate",
    /*end of custom classes or Search*/
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/domReady!"],
        function(Map,
                /*custom classes*/
                MapLayers,
                BaseMapGallery,
                HomeButton,
                LocateButton,
                Measurement,
                OverviewMap,
                Popup,
                MapLegend,
                TOC,
                Scalebar,
                /*end of custom classes*/
                /*custom classes for Search*/
                on,
                Search,
                FeatureLayer,
                InfoTemplate,
                /*end of custom classes or Search*/
                ArcGISDynamicMapServiceLayer) {

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
            var map = new Map("map", {
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

            /* Overview Map*/
            var scalebar = new Scalebar(
                    {
                        map: map,
                        scalebarUnit: "dual"
                    }
            );
            scalebar.showScaleBar();

            //Code to do stuff for Searching

            //Call functions on load
            map.on("load", loadSearch());

            function loadSearch() {
                //Instantiate new search widget
                var s = new Search({
                    enableButtonMode: true, //this enables the search widget to display as a single button
                    enableLabel: false,
                    enableInfoWindow: true,
                    showInfoWindowOnSelect: true,
                    map: map
                }, "search");

                //Get the value of the property from the Search widget
                var sources = s.get("sources");

                //Push the sources used to search, by default the ArcGIS Online World geocoder is included.
				var InfoTemplateString = "Building No: ${BUILDING_N}</br>"+
								"Owner: ${OWNER}</br>"+
								"Address: ${ADDRESS}</br>"+
								"Occupation: ${OCCUPATION}</br>"+
								"Gender: ${GENDER}</br>"+
								"Telephone: ${TELEPHONE}</br>"+
								"Type: ${TYPE}</br>"+
								"Tax Code: ${TAX_CODE}</br>"+
								"Property Value: ${PROPERTY_V}</br>"+
								"Tax Value: ${TAX_VALUE}</br>"+
								"Payment Date: ${PAYMENT_DA}</br>"+
								"Payment Status: ${PAYMENT_ST}</br>"+
								"Land Registration No: ${LRNO}";
                //Add building source to search
                sources.push({
                    featureLayer: arr[0],
                    searchFields: ["OWNER"],
                    displayField: "Owner",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Building by Owner",
                    placeholder: "IBRAHIM JOHN",
                    maxResults: 6,
                    maxSuggestions: 6,
                    //Create an InfoTemplate for buildings
                    infoTemplate: new InfoTemplate("Building", InfoTemplateString),
                    enableSuggestions: true,
                    minCharacters: 0
                });
				
				InfoTemplateString = "Land Registration No: ${LRNO}</br>"+
												"Owner: ${OWNER}</br>"+
												"Address: ${ADDRESS}</br>"+
												"Occupation: ${OCCUPATION}</br>"+
												"Tribe: ${TRIBE}</br>"+
												"Gender: ${GENDER}</br>"+
												"Telephone: ${TELEPHONE}</br>"+
												"Land Use: ${LAND_USE}</br>"+
												"Tax Code: ${TAX_CODE}</br>"+
												"Property Value: ${PROPERTY_V}</br>"+
												"Tax Value: ${TAX_VALUE}</br>"+
												"Payment: ${PAYMENT}</br>"+
												"Payment Date: ${PAYMENT_DA}</br>"
                //Add parcel advertisement source to search
                sources.push({
                    featureLayer: arr[1],
                    searchFields: ["LRNO","PAYMENT_ST"],
                    displayField: "LRNO",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Parcel by LR No",
                    placeholder: "",
                    maxResults: 6,
                    maxSuggestions: 6,
                    //Create an InfoTemplate
                    infoTemplate: new InfoTemplate("Parcel", InfoTemplateString),
                    enableSuggestions: true,
                    minCharacters: 0
                });

                //Set the sources above to the search widget
                s.set("sources", sources);

                //Finalizes the creation of the Search widget
                s.startup();
            }

        });


