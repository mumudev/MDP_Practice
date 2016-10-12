define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var htmlTemplate = require("./item.html");
    var View = Backbone.View.extend({
        tagName: "button",
        className: "item-button",
        model: null,
        events: {
            "mouseover rect": "hover",
            "mouseout rect": "hoverOut"
        },

        initialize: function (options) {
            this.template = _.template(htmlTemplate);
            this.model = options.model;
            this.render();
            this.listenTo(this.model, 'change', this.render);
            this.on('all', this.render);
        },

        render: function () {
            $(this.el).html(this.template({data:this.model.get("itemList"),widget_width:$(this.el).width()}));
        },
        hoverOut: function(e){
            var item_name = $(e.target).attr("data-id");
            $("#count-"+item_name).html("");
            $(item_name + ".item").removeClass("hover");
        },
        hover: function(e){
            var item_name = $(e.target).attr("data-id");
            $("#count-"+item_name).html($(item_name + ".item").length);
            $(item_name + ".item").addClass("hover");
        }
        
    });
    return View;
});
