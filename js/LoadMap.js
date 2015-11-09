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
    "js/Scalebar",
	"js/MToc",
    /*end of custom classes*/
    /*custom classes for Search*/
	"js/MSearch",
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
                Scalebar,
				MToc,				
                /*end of custom classes*/
                /*custom classes for Search*/
                MSearch,
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
				 
				//Call function to load Table of Contents
				MToc.showTOC(arr,map);				

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

            /*
			 *Call functions on load
			 * Begin  with load search
			 */
            map.on("load", MSearch.loadSearch(map,arr));

        });


