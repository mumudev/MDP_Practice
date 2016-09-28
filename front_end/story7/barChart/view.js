define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var htmlTemplate = require("./item.html");
    var View = Backbone.View.extend({
        tagName: "button",
        className: "item-button",
        model: null,
        events: {
            "click .item": "select"
        },

        initialize: function (options) {
            this.template = _.template(htmlTemplate);
            this.model = options.model;
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            $(this.el).html(this.template({data:this.model.get("itemList")}));
        },

    });
    return View;
});
