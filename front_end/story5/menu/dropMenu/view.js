define(function() {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../../util/url.js");
    var util = require("../../util/method.js");
    var htmlTemplate = require("./item.html");
    var View = Backbone.View.extend({
        tagName: "div",

        className: "item",


        selected:null,
        events: {
            "click .btn": "action",
        },

        initialize: function(options) {
            this.template = _.template(htmlTemplate);
            this.render(options.action);
            this.selected= options.selected;
            $(this.el).css("top",options.e.clientY);
            $(this.el).css("left",options.e.clientX);
        },
        render: function(datas) {
            $(this.el).html(this.template({datas:datas}));
        },
        action: function(e) {
            this[e.currentTarget.id]($(this.selected));
        },
        delete: function($this) {
            $this.remove();
            this.remove();
        },

        backgroundColor: function($this) {
            $this.css("background-color", util.getRandomColor());
        },

        fontColor: function($this) {

            $this.css("color", util.getRandomColor());
        },

        increaseFontSize: function($this) {
            var fontSize = $this.css("font-size") === "" ?
                17 : parseInt($this.css("font-size").replace(/[^0-9]/ig, "")) + 1;
            $this.css("font-size", fontSize + "px");
        },

        decreaseFontSize: function($this) {
            var fontSize = $this.css("font-size") === "" ?
                15 : parseInt($this.css("font-size").replace(/[^0-9]/ig, "")) - 1;
            $this.css("font-size", fontSize + "px");
        }
    });
    var actions = {

    };
    return View;
});
