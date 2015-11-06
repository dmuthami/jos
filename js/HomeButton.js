/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/map",
    "esri/dijit/HomeButton",
    "dojo/domReady!"
],
        function(declare, lang, map, HomeButton, domReady) {
            return declare(null, {
                map: null,
                constructor: function(/*Object*/ kwArgs) {
                    lang.mixin(this, kwArgs);
                },
                showHomeButton: function() {
                    //Home button used to zoom back to original extent
                    var home = new HomeButton({
                        map: this.map
                    }, "HomeButton");
                    home.startup();
                }
            });
        });

