/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/dijit/Print",
    "esri/tasks/PrintTemplate",
    "esri/request",
    "esri/config",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/parser",
    "dojo/domReady!"
],
        function(
                declare,
                lang,
                Print,
                PrintTemplate,
                esriRequest,
                esriConfig,
                arrayUtils,
                dom,
                parser
                ) {
            return declare(null, {
                map: null,
                constructor: function(/*Object*/ kwArgs) {
                    lang.mixin(this, kwArgs);
                    parser.parse();
                },
                //create the layer objects
                firePrintWidget: function() {
                    var mapp = this.map;
                    //Print Service URL
                    printUrl = "http://localhost:6080/arcgis/rest/services/NCRS/ExportWebMap/GPServer/Export%20Web%20Map";

                    esriConfig.defaults.io.proxyUrl = "http://localhost/DotNet/proxy.ashx";
                    //esriConfig.defaults.io.corsDetection = false;

                    // get print templates from the export web map task
                    var printInfo = esriRequest({
                        "url": printUrl,
                        "content": {"f": "json"}
                    });
                    printInfo.then(handlePrintInfo, handleError);

                    /* Call back function
                     * Handles the synchronous call for print
                     */
                    function handlePrintInfo(resp) {
                        var layoutTemplate, templateNames, mapOnlyIndex, templates;

                        layoutTemplate = arrayUtils.filter(resp.parameters, function(param, idx) {
                            return param.name === "Layout_Template";
                        });

                        if (layoutTemplate.length == 0) {
                            console.log("print service parameters name for templates must be \"Layout_Template\"");
                            return;
                        }
                        templateNames = layoutTemplate[0].choiceList;

                        // remove the MAP_ONLY template then add it to the end of the list of templates
                        mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
                        if (mapOnlyIndex > -1) {
                            var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
                            templateNames.push(mapOnly);
                        }

                        // create a print template for each choice
                        templates = arrayUtils.map(templateNames, function(ch) {
                            var plate = new PrintTemplate();
                            plate.layout = plate.label = ch;
                            plate.format = "PDF";
                            plate.layoutOptions = {
                                "authorText": "Made by:  NCRS (Jos)",
                                "copyrightText": "NCRS",
                                "legendLayers": [],
                                "titleText": "Property Tax Management System",
                                "scalebarUnit": "Miles"
                            };
                            return plate;
                        });

                        // create the print dijit
                        printer = new Print({
                            "map": mapp,
                            "templates": templates,
                            url: printUrl
                        }, dom.byId("print_button"));
                        printer.startup();
                    }
                    /*Error handler function*/
                    function handleError(err) {
                        console.log("Something broke: ", err);
                    }
                }
            });
        });

