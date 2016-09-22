define(function() {

    'use strict';

    var Backbone = require("Backbone");

    var actionHandler = Backbone.Model.extend({

        defaults: function() {
            return {

                server: '/',

                // for local preview connection
                // by default use MA dev server
                remoteHost: 'http://admadevwb8001:8001/'

            };
        },

        initialize: function() {
            // check if local preview when brower url contains "/.tmp/"
            // var localPreviewMode = /\/\.tmp\//.test(location.href);
            var localPreviewMode = true;
            if (localPreviewMode) {
                var remoteHost = this.get("remoteHost");
                this.set("server", remoteHost);
            }
            return this;
        },

        requestData: function(option, callback) {

            if (!option.server || option.server === "/") {
                option.server = this.get("server");
            }

            return $.ajax({
                url: option.server + option.resource,
                type: option.type,
                cache: option.cache,
                contentType: 'application/json',
                data: JSON.stringify(option.postData),

                success: function(response) {
                    var value = {
                        id: option.dataElementId,
                        data: response
                    };
                    this.trigger("data", value);

                    var status = String(response.status).toUpperCase();
                    if (status === 'ERROR') {
                        $.event.trigger('portfolio_components_response_error', [response, option]);
                    }
                }.bind(this),

                error: function(xhr, status, error) {
                    if (status === "abort") {
                        return;
                    }
                    console.log(error, status);
                    var value = {
                        id: option.dataElementId,
                        status: status,
                        error: error
                    };
                    this.trigger("data", value);

                }.bind(this)
            });
        },

        send: function(actionName, data) {
            /* jshint ignore:start */
            switch (actionName) {
                case "requestData":
                    //require return ajax xhr
                    return this.requestData(data);
                case "configuration":
                    //setting
                    this.trigger("configuration", data);
                    break;
                case "setTitle":
                    this.trigger("setTitle", data);
                    break;
                case "supportedViews":
                    this.trigger("supportedViews", data);
                    break;
                case "supportedSettings":
                    // global setting
                    this.trigger("supportedSettings", data);
                    break;
                case "editorClose":
                    this.trigger("editorClose", data);
                    break;
                default:
                    break;
            }
            /* jshint ignore:end */
            return this;
        }

    });

    return actionHandler;
});
