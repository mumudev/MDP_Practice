define(function() {
    var Backbone = require('Backbone');
    var View = Backbone.View.extend({
        tagName: "div",

        className: "item",

        events: {
            "click": "delete",
        },

        initialize: function() {
            this.render();
        },
        render: function(context) {
            $(this.el).html("<button>test</button>");
        },

        delete: function(e) {
            $(this.el).hide();
        },

        backgroundColor: function(e) {
            $(".selected").css("background-color", getRandomColor());
        },

        fontColor: function(e) {

            $(".selected").css("color", getRandomColor());
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
    });
    return View;
});
