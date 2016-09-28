define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../../util/url.js");
    var util = require("../../util/method.js");
    var htmlTemplate = require("./item.html");
    var View = Backbone.View.extend({
        tagName: "dropMenu",

        className: "dropMenu",


        selected: null,
        events: {
            "click .btn": "action",
        },

        initialize: function (options) {
            this.template = _.template(htmlTemplate);
            this.render(options.action);
            this.selected = options.selected;
            this.$selected = $($(options.selected.el).children()[0]);
            $(this.el).css("top", options.e.clientY);
            $(this.el).css("left", options.e.clientX);
        },
        render: function (datas) {
            $(this.el).html(this.template({ datas: datas }));
        },
        action: function (e) {
            this[e.currentTarget.id]();
        },
        delete: function () {

            this.selected.delete();
            this.remove();
        },

        backgroundColor: function () {
            this.$selected.css("background-color", util.getRandomColor());
        },

        fontColor: function () {

            this.$selected.css("color", util.getRandomColor());
        },

        increaseFontSize: function () {
            var fontSize = this.$selected.css("font-size") === "" ?
                17 : parseInt(this.$selected.css("font-size").replace(/[^0-9]/ig, "")) + 1;
            this.$selected.css("font-size", fontSize + "px");
        },

        decreaseFontSize: function () {
            var fontSize = this.$selected.css("font-size") === "" ?
                15 : parseInt(this.$selected.css("font-size").replace(/[^0-9]/ig, "")) - 1;
            this.$selected.css("font-size", fontSize + "px");
        }
    });
    var actions = {

    };
    return View;
});
