define(function() {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../util/url.js");
    var util = require("../util/method.js");
    var View = Backbone.View.extend({
        tagName: "div",

        className: "item",

        events: {
            "click .btn": "action",
        },

        initialize: function(options) {
            $(this.el).html("");
            this.template = _.template($("#dropMenuT").html());
            this.render(options.datas);
        },
        render: function(actions) {
            var self = this;
            $(self.el).html(self.template({datas:actions}));
            return this;
        },
        action: function(e) {
            actions[e.currentTarget.id](e);
        },
    });
    var actions = {

        delete: function(e) {
            $(".selected").hide();
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
        }
    };
    return View;
});
