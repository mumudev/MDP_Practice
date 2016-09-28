define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../../util/url.js");
    var util = require("../../util/method.js");
    var htmlTemplate = require("./item.html");
    var DropMenu = require("../../menu/dropMenu/view.js");
    var View = Backbone.View.extend({
        tagName: "image",
        className: "item-image",
        model: null,
        events: {
            "click .item": "select"
        },

        initialize: function (options) {
            this.template = _.template(htmlTemplate);
            this.model = options.model;
            this.render(this.model.get("data"));
        },

        render: function (data) {
            $(this.el).html(this.template(data));
        },

        delete: function () {
            this.model.set("destroy",true);
            this.remove();
        },
        select: function (e) {
            if ($("#dropMenu")) {
                $("#dropMenu").remove();
            }
            if ($(this.el).children()[0]) {
                var dropContent = $("<div class='menu' id='dropMenu'></div>");
                $(this.el).append(dropContent);
                var dropMenu = new DropMenu({
                    el: dropContent,
                    action: this.model.get("action"),
                    selected: this,
                    e:e
                });
            } else {
                this.remove();
            }
        }
    });
    return View;
});
