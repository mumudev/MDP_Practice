define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../util/url.js");
    var htmlTemplate = require("./item.html");
    var views = {
        button: require("../item/button/view.js"),
        div: require("../item/div/view.js"),
        image: require("../item/image/view.js"),
        inputText: require("../item/inputText/view.js"),
        table: require("../item/table/view.js")
    };
    var Models = {
        button: require("../item/button/model.js"),
        div: require("../item/div/model.js"),
        image: require("../item/image/model.js"),
        inputText: require("../item/inputText/model.js"),
        table: require("../item/table/model.js")
    };
    var collection = Backbone.Collection.extend({
        
    });

    return collection;
});
