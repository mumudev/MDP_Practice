define(function() {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var util = require("../util/method.js");
    var url = require("../util/url.js");
    var View = Backbone.View.extend({
        tagName: "table",

        className: "item-table",


        events: {
            "click": "select",
            "delete": "delete",
            "backgroundColor": "backgroundColor",
            "fontColor": "fontColor",
            "increaseFontSize": "increaseFontSize",
            "decreaseFontSize": "decreaseFontSize",
        },

        initialize: function(options) {
            this.template = _.template($("#tableT").html()); 
            this.render(options.data);
        },
        render: function(data) {
            $(this.el).html(this.template( data ));
        },

        delete: function(e) {
            $(this.el).hide();
        },

        backgroundColor: function(e) {
            $(".selected").css("background-color", util.getRandomColor());
        },

        fontColor: function(e) {

            $(".selected").css("color", util.getRandomColor());
        },

        increaseFontSize: function(e) {
            var fontSize = $(".selected").css("font-size") === "" ?
                17 : parseInt($(".selected").css("font-size").replace(/[^0-9]/ig, "")) + 1;
            $(".selected").css("font-size", fontSize + "px");
        },

        decreaseFontSize: function(e) {
            var fontSize = $(".selected").css("font-size") === "" ?
                15 : parseInt($(".selected").css("font-size").replace(/[^0-9]/ig, "")) - 1;
            $(".selected").css("font-size", fontSize + "px");
        },
        select:function(e) {
            util.clearSelected(e);
            $(this.el).children().addClass("selected");
            $("#dropMenu").toggle();

        }
    });
    return View;
});
