define(function() {
    var Backbone = require('Backbone');
    var url = require("../util/url.js");
    var _ = require("underscore");
    var util = require("../util/method.js");
    var View = Backbone.View.extend({
        tagName: "img",

        className: "item-image",

        events: {
            "click": "select",
            "delete": "delete"
        },

        initialize: function(options) {
            this.template = _.template($("#imageT").html());
            this.render(options.data);
        },
        render: function(data) {
            $(this.el).html(this.template(data));
        },

        delete: function(e) {
            $(this.el).hide();
        },
        select: function(e) {
            util.clearSelected(e);
            $(this.el).children().addClass("selected");
            $("#dropMenu").toggle();
        }
    });
    return View;
});
