define([
    "dojo/on",
    "esri/dijit/Search",
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate"
],
        function(
                on,
                Search,
                FeatureLayer,
                InfoTemplate
                ) {
            var mapp;
            var myarr;
            return {
                loadSearch: function(map, arr) {
                    mapp = map;
                    myarr = arr
                    try {
                        //Instantiate new search widget
                        var s = new Search({
                            enableButtonMode: true, //this enables the search widget to display as a single button
                            enableLabel: false,
                            enableInfoWindow: true,
                            showInfoWindowOnSelect: true,
                            map: mapp
                        }, "search");

                        //Get the value of the property from the Search widget
                        var sources = s.get("sources");

                        //Push the sources used to search, by default the ArcGIS Online World geocoder is included.
                        var InfoTemplateString = "Building No: ${BUILDING_N}</br>" +
                                "Owner: ${OWNER}</br>" +
                                "Address: ${ADDRESS}</br>" +
                                "Occupation: ${OCCUPATION}</br>" +
                                "Gender: ${GENDER}</br>" +
                                "Telephone: ${TELEPHONE}</br>" +
                                "Type: ${TYPE}</br>" +
                                "Tax Code: ${TAX_CODE}</br>" +
                                "Property Value: ${PROPERTY_V}</br>" +
                                "Tax Value: ${TAX_VALUE}</br>" +
                                "Payment Date: ${PAYMENT_DA}</br>" +
                                "Payment Status: ${PAYMENT_ST}</br>" +
                                "Land Registration No: ${LRNO}";
                        //Add building source to search
                        sources.push({
                            featureLayer: myarr[1],
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

                        InfoTemplateString = "Land Registration No: ${LRNO}</br>" +
                                "Owner: ${OWNER}</br>" +
                                "Address: ${ADDRESS}</br>" +
                                "Occupation: ${OCCUPATION}</br>" +
                                "Tribe: ${TRIBE}</br>" +
                                "Gender: ${GENDER}</br>" +
                                "Telephone: ${TELEPHONE}</br>" +
                                "Land Use: ${LAND_USE}</br>" +
                                "Tax Code: ${TAX_CODE}</br>" +
                                "Property Value: ${PROPERTY_V}</br>" +
                                "Tax Value: ${TAX_VALUE}</br>" +
                                "Payment: ${PAYMENT}</br>" +
                                "Payment Date: ${PAYMENT_DA}</br>"
                        //Add parcel source to search
                        sources.push({
                            featureLayer: myarr[2],
                            searchFields: ["LRNO", "PAYMENT_ST"],
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
                    catch (err) {
                        console.log("loadSearch: function (MSearch.js) "+err.message);
                    }
                }
            };
        });

